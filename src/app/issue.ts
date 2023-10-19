export interface Issue {
    issueNo?: any;
    title: string;
    description: string;
    priority: 'low' | 'high';
    type: 'Feature' | 'Bug' | 'Documentation';
    completed?: Date
}
