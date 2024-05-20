package help.desk.helpdesk.models;

import java.io.Serializable;
import java.util.Optional;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
@Getter
@Entity
@Table(name = "Patrimonio")
public class PatrimonioModel implements Serializable {
	private static final long serialVersionUID = 1L;

	//@GeneratedValue(strategy=) //gerar id automaticamente
	@Id
	private UUID idPatrimonio; //ids distribuidos
	private String nome_descricao;
	private String CNPJ;
	private String nomeUsuario;

	private String logradouro;
	private String cep;
	private String num;
	

	//private String numero_serie;
	//private Date data_aquisicao;
	//private String localizacao;
	//private BigDecimal valor;
	
	public UUID getIdPatrimonio() {
		return idPatrimonio;
	}
	public void setIdPatrimonio(UUID idPatrimonio) {
		this.idPatrimonio = idPatrimonio;
	}
	public String getNome_descricao() {
		return nome_descricao;
	}
	public void setNome_descricao(String nome_descricao) {
		this.nome_descricao = nome_descricao;
	}
	
	//public String getNumero_serie() {
	//	return numero_serie;
	//}

	//public void setNumero_serie(String numero_serie) {
	//	this.numero_serie = numero_serie;
	//}

	//public Date getData_aquisicao() {
	//	return data_aquisicao;
	//}

	//public void setData_aquisicao(Date data_aquisicao) {
	//	this.data_aquisicao = data_aquisicao;
	//}

	//public String getLocalizacao() {
	//	return localizacao;
	//}

	//public void setLocalizacao(String localizacao) {
	//	this.localizacao = localizacao;
	//}

	//public BigDecimal getValor() {
	//	return valor;
	//}

	//public void setValor(BigDecimal valor) {
	//	this.valor = valor;
	//}

	public PatrimonioModel(){}

	public PatrimonioModel(Optional<PatrimonioModel> patrimonioModel){
		patrimonioModel.map(pat -> {
			this.idPatrimonio = pat.idPatrimonio;
			this.nomeUsuario = pat.nomeUsuario;
			this.nome_descricao = pat.nome_descricao;
			this.CNPJ = pat.CNPJ;
			//this.numero_serie = pat.numero_serie;
			//this.valor = pat.valor;
			//this.data_aquisicao = pat.data_aquisicao;
			//this.localizacao = pat.localizacao;
			return null;
		});
	}

	public PatrimonioModel(UUID id, String usuarioNome,String nomeDesc, String CNPJ){
		this.idPatrimonio = id;
		this.nome_descricao = nomeDesc;
		this.nomeUsuario = usuarioNome;
		this.CNPJ = CNPJ;

	}
}
