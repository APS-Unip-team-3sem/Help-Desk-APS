package help.desk.helpdesk.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PessoaDto(@NotBlank String nome, @NotBlank String cpf, @NotBlank String empresa_pessoa) {

}
