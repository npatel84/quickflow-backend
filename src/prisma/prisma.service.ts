import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

type ModelKey = keyof Omit<PrismaService, keyof PrismaClient>;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;
    
    // Use with caution - intended for testing environments
    const models = Reflect.ownKeys(this).filter(
      key => typeof key === 'string' && !key.startsWith('_') && key !== 'engine' && key !== '$connect' && key !== '$disconnect' && key !== '$on' && key !== '$transaction' && key !== '$use'
    ) as ModelKey[];

    for (const modelKey of models) {
      if (typeof this[modelKey] === 'object' && 'deleteMany' in this[modelKey]) {
        // Now TypeScript knows this[modelKey] has deleteMany
        await (this[modelKey] as any).deleteMany();
      }
    }
  }
} 