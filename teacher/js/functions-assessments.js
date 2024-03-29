document.addEventListener('DOMContentLoaded', function(){
	var formAssessment = document.querySelector('#formAssessment');
	formAssessment.onsubmit = function(e){
		e.preventDefault();
		
		var id          = document.querySelector('#id');
		var idContent   = document.querySelector('#idContent');
		var title       = document.querySelector('#title');
		var description = document.querySelector('#description');
		var date        = document.querySelector('#date');
		var percentage  = document.querySelector('#percentage');
		
		if(title == '' || description == '' || date == '' || percentage == ''){
			Swal.fire('Atencion', 'Todos los campos son necesarios', 'error');
			return false;
		}
		
		var request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
		var url     = './models/assessments/ajax_assessments.php';
		var form    = new FormData(formAssessment);
		
		request.open('POST', url, true);
		request.send(form);
		request.onreadystatechange = function(){
			if(request.readyState == 4 && request.status == 200){
				var data = JSON.parse(request.responseText);
				Swal.fire({
					title: "Crear/Actualizar evaluacion",
					showDenyButton: true,
					confirmButtonText: "Aceptar",
				}).then((result) => {
					if(result.isConfirmed){
						if(data.status){
							$('#modalAssessment').modal('hide');
							location.reload();
							formAssessment.reset();
						}else{
							Swal.fire('Atencion', data.msg, 'error');
						}
					}
				});
			}
		}
	}
})

function openModalAssessment()
{
	document.querySelector('#id').value = '';
	document.querySelector('#tituloModal').value = 'Nueva Evaluacion';
	document.querySelector('#action').innerHTML = 'Guardar';
	document.querySelector('#formAssessment').reset();
	$('#modalAssessment').modal('show');
}

function editAssessment(id)
{
	idAssessment = id;
	
	document.querySelector('#tituloModal').value = 'Actualizar Evaluacion';
	document.querySelector('#action').innerHTML = 'Actualizar';
	
	var request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
	var url     = './models/assessments/edit_assessments.php?id='+idAssessment;
	request.open('GET', url, true);
	request.send();
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			var data = JSON.parse(request.responseText);
			if(data.status){
				document.querySelector('#id').value = data.data.id;
				document.querySelector('#title').value = data.data.title;
				document.querySelector('#description').value = data.data.description;
				document.querySelector('#date').value = data.data.date;
				document.querySelector('#percentage').value = data.data.percentage;
				
				$('#modalAssessment').modal('show');
			}else{
				Swal.fire('Atencion', data.msg, 'error');
			}
		}
	}
}

function deleteAssessment(id)
{
	var idAssessment = id;
	
	Swal.fire({
		title: "Eliminar Evaluacion",
		text: "¿Realmente desea eliminar la evaluacion?",
		showDenyButton: true,
		confirmButtonText: "Si, eliminar",
		denyButtonText: `No, cancelar`
	}).then((result) => {
		if(result.isConfirmed){
			var request = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
			var url     = './models/assessments/delete_assessments.php';
			
			request.open('POST', url, true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  // Configurar los encabezados antes de enviar
			var strData = "id=" + idAssessment;
			request.send(strData);
			request.onreadystatechange = function () {
			    if (request.readyState == 4 && request.status == 200) {
			        var data = JSON.parse(request.responseText);
			        if (data.status) {
			            location.reload();
			        }else{
			            Swal.fire('Atencion', data.msg, 'error');
			        }
			    }
			};
		}
	});
}