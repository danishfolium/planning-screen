import { TaskTag } from "@/enums/enum";

export interface Task {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    tag: TaskTag;
    userId: string;
    day: string;
};

export interface User {
    id: string;
    name: string;
    role: string;
    avatar: string;
};