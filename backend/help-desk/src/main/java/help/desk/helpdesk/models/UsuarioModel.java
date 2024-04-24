package help.desk.helpdesk.models;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import help.desk.helpdesk.auth.TipoUsuario;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "usuario")
@Entity(name = "usuario")

public class UsuarioModel implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String nome;
    private String senha;
    private String tipousuario;


    public long getId() {
        return id;
    }
    public String getNome() {
        return nome;
    }
    public String getSenha() {
        return senha;
    }
    @Enumerated(EnumType.STRING)
    public String getTipousuario() {
        return TipoUsuario.valueOf(tipousuario).getTipo();
    }
    
    public void setId(long id) {
        this.id = id;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    
    public UsuarioModel(String nome, String senha, String tipousuario){
        this.nome = nome;
        this.senha = senha;
        this.tipousuario = tipousuario;
    }
    // -- Métodos do UserDetails -> Spring Security
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(TipoUsuario.valueOf(tipousuario) == TipoUsuario.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }
    @Override
    public String getUsername() {
        return nome;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
    @Override
    public String getPassword() {
        return senha;
    }
    
}
