import { Module } from '@nestjs/common'
import { CombatTrackerService } from './combat-tracker.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CombatTracker } from './combatTracker.entity'

@Module({
    imports: [TypeOrmModule.forFeature([CombatTracker])],
    providers: [CombatTrackerService],
})
export class CombatTrackerModule {}
