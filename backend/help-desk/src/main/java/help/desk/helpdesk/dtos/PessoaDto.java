package help.desk.helpdesk.dtos;

import jakarta.validation.constraints.NotBlank;

public record PessoaDto(@NotBlank String nome, @NotBlank String cpf, @NotBlank String empresa_pessoa, String nomeInteiro) {

}
