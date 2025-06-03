export interface i_quick_reply {
    name: string;
    func: string;
}

export interface i_msg {
    content: string;
    role: 'user' | 'ai' | 'ai thinking';
    quick_reply?: i_quick_reply[]; // Made quick_reply optional and an array
    ui_component?: string;      // Made ui_component optional
} 