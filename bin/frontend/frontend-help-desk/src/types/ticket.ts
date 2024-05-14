export type Ticket = {
    id: number;
    title: string;
    description: string;
    status: string;
    user: string;
    created_at: Date;
    updated_at: Date;
};