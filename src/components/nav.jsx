function Navbar() {
    return(
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">
                    SOLARI AI
                </div>
                <div>
                    <a href="/" className="text-gray-300 hover:text-white mx-2">Login</a>
                    <a href="/inicio" className="text-gray-300 hover:text-white mx-2">Inicio</a>
                    <a href="/registro" className="text-gray-300 hover:text-white mx-2">Registrarse</a>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;