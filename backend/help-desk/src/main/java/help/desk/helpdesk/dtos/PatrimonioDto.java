    package help.desk.helpdesk.dtos;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PatrimonioDto(@NotBlank String nome_descricao, @NotNull BigDecimal valor) {}
