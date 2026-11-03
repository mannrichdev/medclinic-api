import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Appointment } from '../entities/Appointment';
import { Patient } from '../entities/Patient';
import { User } from '../entities/User';

export class ReportController {
  // Relatório com resumo geral do sistema (Métricas Rápidas)
  async summary(req: Request, res: Response): Promise<Response> {
    try {
      const patientRepository = AppDataSource.getRepository(Patient);
      const userRepository = AppDataSource.getRepository(User);
      const appointmentRepository = AppDataSource.getRepository(Appointment);

      const totalPatients = await patientRepository.count();
      const totalUsers = await userRepository.count();
      const totalAppointments = await appointmentRepository.count();

      return res.json({
        total_patients: totalPatients,
        total_users: totalUsers,
        total_appointments: totalAppointments,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao gerar o resumo estatístico.' });
    }
  }

  // Relatório detalhado de consultas filtrado por período e/ou status
  async appointmentsReport(req: Request, res: Response): Promise<Response> {
    try {
      const { startDate, endDate } = req.query;

      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const queryBuilder = appointmentRepository
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.patient', 'patient')
        .leftJoinAndSelect('appointment.user', 'user')
        .orderBy('appointment.appointment_date', 'DESC');

      if (startDate && endDate) {
        queryBuilder.andWhere(
          'appointment.appointment_date BETWEEN :startDate AND :endDate',
          {
            startDate: new Date(startDate as string),
            endDate: new Date(endDate as string),
          }
        );
      }

      const appointments = await queryBuilder.getMany();

      return res.json({
        total_records: appointments.length,
        appointments,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao gerar relatório de consultas.' });
    }
  }
}