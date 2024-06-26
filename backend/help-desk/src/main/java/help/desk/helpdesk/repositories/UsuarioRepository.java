package help.desk.helpdesk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import help.desk.helpdesk.models.Usuario.UsuarioModel;
import help.desk.helpdesk.models.Usuario.UsuarioModelDTO;


public interface UsuarioRepository extends JpaRepository<UsuarioModel, java.util.UUID>{
    
    UserDetails findByNomeIgnoreCase(String nome);
    UsuarioModelDTO getIdByNomeIgnoreCase(String nome);
}
