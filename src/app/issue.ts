export interface Issue {
    issueNo?: any;
    title: String;
    description: string;
    priority: 'low' | 'high';
    type: 'Feature' | 'Bug' | 'Documentation';
    completed?: Date
}
