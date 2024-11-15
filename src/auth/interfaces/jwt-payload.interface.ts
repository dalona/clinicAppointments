export interface JwtPayload{
    email:string
    role: 'admin' | 'patient' | 'doctor'
}