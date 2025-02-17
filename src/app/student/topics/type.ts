export interface Topic {
    enName: string
    vnName: string
    createBy: string
    code: string
    status: string
    abbreviations: string
    vietnameseTitle: string
    profession: string
    specialty: string
    description: string
    supervisor: {
        name: string
        email: string
    }
}