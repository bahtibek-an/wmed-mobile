export interface User {
    id: number;
    username: string;
    fullName: string;
}

export enum DayOfTheWeek {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY',
}

export interface DoctorSchedule {
    day: DayOfTheWeek;
    dailySchedule: {
        startTime: string;
        endTime: string;
    }[];
}

export interface Doctor {
    id: number;
    fullName: string;
    specialization: string;
    description: string;
    longitude: string;
    latitude: string;
    schedules: DoctorSchedule[];
    avatar: string;
    cost: number;
}

export interface Queue {
    id: number;
    fullName: string;
    username: string;
    position: number;
    status: string;
    firstName: string;
    lastName: string;
    doctorId: number;
    createdAt: number;
}