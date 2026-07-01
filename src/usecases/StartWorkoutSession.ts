import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

import {
  NotFoundError,
  SessionAlreadyStartedError,
  WorkoutPlanNotActiveError,
} from "../errors/index.js";
import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/db.js";

dayjs.extend(utc);

interface InputDto {
  userId: string;
  workoutPlanId: string;
  workoutDayId: string;
}

interface OutputDto {
  userWorkoutSessionId: string;
}

export class StartWorkoutSession {
  async execute(dto: InputDto): Promise<OutputDto> {
    const workoutPlan = await prisma.workoutPlan.findUnique({
      where: { id: dto.workoutPlanId },
    });

    if (!workoutPlan) {
      throw new NotFoundError("Workout plan not found");
    }

    if (workoutPlan.userId !== dto.userId) {
      throw new NotFoundError("Workout plan not found");
    }

    if (!workoutPlan.isActive) {
      throw new WorkoutPlanNotActiveError("Workout plan is not active");
    }

    const workoutDay = await prisma.workoutDay.findUnique({
      where: { id: dto.workoutDayId, workoutPlanId: dto.workoutPlanId },
    });

    if (!workoutDay) {
      throw new NotFoundError("Workout day not found");
    }

    const todayStart = dayjs.utc().startOf("day").toDate();
    const todayEnd = dayjs.utc().endOf("day").toDate();

    try {
      const session = await prisma.$transaction(
        async (tx) => {
          const existingSession = await tx.workoutSession.findFirst({
            where: {
              workoutDayId: dto.workoutDayId,
              startedAt: { gte: todayStart, lte: todayEnd },
            },
          });

          if (existingSession) {
            throw new SessionAlreadyStartedError(
              "A session has already been started for this day",
            );
          }

          return tx.workoutSession.create({
            data: {
              workoutDayId: dto.workoutDayId,
              startedAt: new Date(),
            },
          });
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );

      return {
        userWorkoutSessionId: session.id,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034"
      ) {
        throw new SessionAlreadyStartedError(
          "A session has already been started for this day",
        );
      }
      throw error;
    }
  }
}
