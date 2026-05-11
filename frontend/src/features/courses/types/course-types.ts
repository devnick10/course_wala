export interface Course {
    title:string
    description:string
    thumbnail:string
    video:string
    author:string
    price:number
}


export interface ApiResponse {
    message: string,
}

export interface CousesApiResponse {
    message: string
    data: Course[]
}