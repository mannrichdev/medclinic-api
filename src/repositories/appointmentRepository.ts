import { AppDataSource } from '../database/data-source';
import { Appointment } from '../entities/Appointment';

export const appointmentRepository = AppDataSource.getRepository(Appointment);