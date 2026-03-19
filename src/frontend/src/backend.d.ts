import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Contact {
    name: string;
    email: string;
    message: string;
}
export interface Appointment {
    serviceType: string;
    name: string;
    email: string;
    message: string;
    preferredDate: string;
    phone: string;
}
export interface backendInterface {
    bookAppointment(name: string, email: string, phone: string, serviceType: string, preferredDate: string, message: string): Promise<void>;
    getAllAppointments(): Promise<Array<Appointment>>;
    getAllContacts(): Promise<Array<Contact>>;
    submitContact(name: string, email: string, message: string): Promise<void>;
}
