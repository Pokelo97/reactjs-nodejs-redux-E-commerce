const SignOut =({history})=>{
    localStorage.removeItem('token')
    localStorage.removeItem('isauthenticated')
    localStorage.removeItem('userData')
    history.push('/Shop')
}
export default SignOut