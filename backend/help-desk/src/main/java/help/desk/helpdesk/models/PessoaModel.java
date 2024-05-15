package help.desk.helpdesk.models;

import java.io.Serializable;
import java.util.UUID;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Pessoa")
public class PessoaModel implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private UUID idPessoa;
	private String nome;
	private String cpf;
	private String empresa_pessoa;
	private Role role;
	
	public UUID getIdPessoa() {
		return idPessoa;
	}
	public void setIdPessoa(UUID idPessoa) {
		this.idPessoa = idPessoa;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCPF() {
		return cpf;
	}
	public void setCPF(String cpf) {
		this.cpf = cpf;
	}
	public String getEmpresa_pessoa() {
		return empresa_pessoa;
	}
	public void setEmpresa_pessoa(String empresa_pessoa) {
		this.empresa_pessoa = empresa_pessoa;
	}
	
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}

	public enum Role {
		ROLE_ADMIN, ROLE_CLIENT
	}
	
	
}
