package help.desk.helpdesk.controller;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import help.desk.helpdesk.dtos.PatrimonioDto;
import help.desk.helpdesk.models.PatrimonioModel;
import help.desk.helpdesk.repositories.PatrimonioRepository;
import jakarta.validation.Valid;

@RestController
public class PatrimonioController {
	
	@Autowired
	PatrimonioRepository patrimonioRepository;

	// POST (Create)
	@PostMapping("/patrimonios")
	public ResponseEntity<PatrimonioModel> saveProduct(@RequestBody @Valid PatrimonioDto patrimonioDto) {
		// popular campos do model com dados recebidos no DTO
		PatrimonioModel patrimonioModel = new PatrimonioModel();
		BeanUtils.copyProperties(patrimonioDto, patrimonioModel); // conversão do objeto DTO para objeto do model
		return ResponseEntity.status(HttpStatus.CREATED).body(patrimonioRepository.save(patrimonioModel)); 															
	}
	
	//GET ALL (read)
	@GetMapping("/patrimonios")
	public ResponseEntity<List<PatrimonioModel>> getAllPatrimonios() {
		return ResponseEntity.status(HttpStatus.OK).body(patrimonioRepository.findAll());
	}
	
	//GET ONE
	@GetMapping("/patrimonios/{id}")
	public ResponseEntity<Object> getOneProduct(@PathVariable(value="id") UUID id){
		Optional<PatrimonioModel> patrimonio = patrimonioRepository.findById(id);
		if(patrimonio.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(patrimonio.get());
	}
	
	//PUT
	@PutMapping("/patrimonios/{id}")
	public ResponseEntity<Object> updateProduct(@PathVariable(value = "id") UUID id, @RequestBody @Valid PatrimonioDto patrimonioDto) {
		Optional<PatrimonioModel> patrimonio = patrimonioRepository.findById(id);
		if (patrimonio.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
		}
		PatrimonioModel patrimonioModel = patrimonio.get();
		BeanUtils.copyProperties(patrimonioDto, patrimonioModel);
		return ResponseEntity.status(HttpStatus.OK).body(patrimonioRepository.save(patrimonioModel));
	}
	
	//DELETE
	@DeleteMapping("/products/{id}")
	public ResponseEntity<Object> deleteProduct(@PathVariable(value="id") UUID id) {
		Optional<PatrimonioModel> patrimonio = patrimonioRepository.findById(id);
		if(patrimonio.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
		}
		patrimonioRepository.delete(patrimonio.get());
		return ResponseEntity.status(HttpStatus.OK).body("Product deleted successfully.");
	}

}
