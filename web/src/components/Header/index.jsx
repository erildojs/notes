import { Container, Profile } from "./style";


export function Header() {
  return (
    <Container>
      <Profile>
        <img src="https://github.com/ErildoJS.png" alt="Imagem do usuario" />
        <div>
  
          <span>Bem vindo</span>
  
  
          <strong>Erildo Francisco</strong>
        </div>
      </Profile>
    </Container>
  )
}