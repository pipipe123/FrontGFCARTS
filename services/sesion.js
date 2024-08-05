
export const useManejoSesion = (usuario, navigate) => {
    console.log(usuario)
    if (!usuario) {
      navigate('/login');
    }
  };
  