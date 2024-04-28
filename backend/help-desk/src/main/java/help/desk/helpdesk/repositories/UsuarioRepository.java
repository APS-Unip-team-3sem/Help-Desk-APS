package help.desk.helpdesk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import help.desk.helpdesk.models.Usuario.UsuarioModel;



public interface UsuarioRepository extends JpaRepository<UsuarioModel,Long>{
    
    UserDetails findByNome(String nome);
}
