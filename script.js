/**
 * ============================================
 * EJERCICIO DE MANIPULACIÓN DEL DOM
 * ============================================
 * 
 * Objetivo: Aplicar conceptos del DOM para seleccionar elementos,
 * responder a eventos y crear nuevos elementos dinámicamente.
 * 
 * Autores: [Manuel Enrique Serrano Barajas
 *           Wilmer Ferney Ardila Ordoñez]
 * Fecha:   [12/02/2026]
 * ============================================
 */

// ============================================
// 1. SELECCIÓN DE ELEMENTOS DEL DOM
// ============================================

/**
 * Seleccionamos los elementos del DOM que necesitamos manipular.
 * Usamos getElementById para obtener referencias a los elementos únicos.
 */

// Formulario de consulta
const userForm = document.getElementById('messageForm'); 
const userNameInput = document.getElementById('userName');

//Formulario consulta tareas
const messageForm = document.getElementById('messageForm'); // Form consulta
const taskForm = document.getElementById('taskForm');       // Form tareas
const taskSection = document.getElementById('taskSection');

// Botón de consulta
const btnVerifyUser = document.getElementById('submitBtn');

// Elementos de información de usuario
const userInfoDisplay = document.getElementById('userInfoDisplay');
const infoEmail = document.getElementById('infoEmail');
const infoID = document.getElementById('infoID');

// Campos de Tarea
const taskTitleInput = document.getElementById('taskTitle');
const userMessageInput = document.getElementById('userMessage');
const taskStatusInput = document.getElementById('taskStatus');

// Contenedor de mensajes y contadores
const messagesContainer = document.getElementById('messagesContainer');
const emptyState = document.getElementById('emptyState');
const messageCount = document.getElementById('messageCount');

// Elementos para mostrar errores
const userNameError = document.getElementById('userNameError');
const userMessageError = document.getElementById('userMessageError');

// Estado de la aplicación
let totalMessages = 0;
let currentUser = null;


// ============================================
// 2. FUNCIONES AUXILIARES
// ============================================

/**
 * Valida que un campo no esté vacío ni contenga solo espacios en blanco
 * @param {string} value - El valor a validar
 * @returns {boolean} - true si es válido, false si no lo es
 */
function isValidInput(value) {
    // TODO: Implementar validación
    // Pista: usa trim() para eliminar espacios al inicio y final
    // Retorna true si después de trim() el string tiene longitud > 0
    return value.trim().length > 0;
}

/**
 * Muestra un mensaje de error en un elemento específico
 * @param {HTMLElement} errorElement - Elemento donde mostrar el error
 * @param {string} message - Mensaje de error a mostrar
 */
function showError(errorElement, message) {
    // TODO: Implementar función para mostrar error
    // Pista: asigna el mensaje al textContent del elemento
    errorElement.textContent = message;
}

/**
 * Limpia el mensaje de error de un elemento específico
 * @param {HTMLElement} errorElement - Elemento del que limpiar el error
 */
function clearError(errorElement) {
    // TODO: Implementar función para limpiar error
    // Pista: asigna un string vacío al textContent
    errorElement.textContent = "";
}

/**
 * Valida todos los campos del formulario
 * @returns {boolean} - true si todos los campos son válidos, false si alguno no lo es
 */
function validateForm() {
    // TODO: Implementar validación completa del formulario
    // 1. Obtener los valores de los inputs usando .value
    // 2. Crear una variable para saber si el formulario es válido (inicialmente true)
    // 3. Validar el campo de nombre de usuario
    //    - Si no es válido, mostrar error y cambiar la variable a false
    //    - Si es válido, limpiar el error
    // 4. Validar el campo de mensaje
    //    - Si no es válido, mostrar error y cambiar la variable a false
    //    - Si es válido, limpiar el error
    // 5. Retornar si el formulario es válido o no
    
    // Ejemplo de estructura:
    /*
    const userName = userNameInput.value;
    const userMessage = userMessageInput.value;
    let isValid = true;
    
    // Validar nombre
    if (!isValidInput(userName)) {
        // Mostrar error
        // Agregar clase 'error' al input
        isValid = false;
    } else {
        // Limpiar error
        // Remover clase 'error' del input
    }
    
    // Validar mensaje (estructura similar)
    
    return isValid;
    */
    const userName = userNameInput.value;
    let isValid = true;
    
    // Validar nombre
    if (!isValidInput(userName)) {
        showError(userNameError, "El nombre es obligatorio para la consulta.");
        isValid = false;
    } else {
        clearError(userNameError);
    }
    
    return isValid;
}

/**
 * Obtiene la fecha y hora actual formateada
 * @returns {string} - Fecha y hora en formato legible
 */
function getCurrentTimestamp() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return now.toLocaleDateString('es-ES', options);
}

/**
 * Obtiene las iniciales de un nombre
 * @param {string} name - Nombre completo
 * @returns {string} - Iniciales en mayúsculas
 */
function getInitials(name) {
    // TODO: Implementar función para obtener iniciales
    // Pista: 
    // 1. Separar el nombre por espacios usando split(' ')
    // 2. Tomar la primera letra de cada palabra
    // 3. Unirlas y convertirlas a mayúsculas
    // 4. Si solo hay una palabra, retornar las dos primeras letras
    const words = name.split(' ');
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

/**
 * Actualiza el contador de mensajes
 */
function updateMessageCount() {
    // TODO: Implementar actualización del contador
    // Pista: Usa template literals para crear el texto
    // Formato: "X mensaje(s)" o "X mensajes"
    // Selecciona el elemento del DOM donde se muestra el contador de tareas.

  // Usamos un template literal para construir el texto dinámicamente.
  // `${totalMessages}` inserta el número actual de tareas.
  // El operador ternario decide si mostrar "tarea" (singular) o "tareas" (plural).
  // - Si totalMessages === 1 → "1 tarea"
  // - En cualquier otro caso → "X tareas"
    messageCount.textContent = `${totalMessages} ${totalMessages === 1 ? "tarea" : "tareas"}`;
}

/**
 * Oculta el estado vacío (mensaje cuando no hay mensajes)
 */
function hideEmptyState() {
    // TODO: Implementar función para ocultar el estado vacío
    // Pista: Agrega la clase 'hidden' al elemento emptyState
    if (emptyState) emptyState.classList.add('hidden');
}

/**
 * Muestra el estado vacío (mensaje cuando no hay mensajes)
 */
function showEmptyState() {
    // TODO: Implementar función para mostrar el estado vacío
    // Pista: Remueve la clase 'hidden' del elemento emptyState
    if (emptyState) emptyState.classList.remove('hidden')
}

function resetAppState() {
    // Borra las tareas visuales y regresa el mensaje de "No hay tareas"
    messagesContainer.innerHTML = ''; 
    messagesContainer.appendChild(emptyState);
    
    // Resetea contadores y lógica
    totalMessages = 0;
    currentUser = null;
    updateMessageCount();
    showEmptyState();

    // Bloquea la sección de tareas por seguridad
    taskSection.classList.add('disabled-section');
}

//2.1, funciones de accion nuevas, para eliminar, y editar tareas
async function deleteTask(id, cardElement) {
    if (!confirm("¿Deseas eliminar esta tarea?")) return;
    try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
        if (response.ok) {
            cardElement.remove();
            totalMessages--;
            updateMessageCount();
            if (totalMessages === 0) showEmptyState();
        }
    } catch (error) {
        alert("Error al borrar la tarea.");
    }
}

function makeEditable(card, taskId) {
    const contentDiv = card.querySelector('.message-card__content');
    const oldTitle = contentDiv.querySelector('.task-title').textContent;
    const oldDesc = contentDiv.querySelector('.task-desc').textContent;
    const oldStatus = card.querySelector('.badge').textContent;
    
    contentDiv.innerHTML = `
        <div style="margin-top:10px; display:flex; flex-direction:column; gap:10px; background: white; padding: 15px; border-radius: var(--radius-md); border: 1px solid var(--color-gray-200); box-shadow: var(--shadow-sm);">
            <div class="form__group" style="margin-bottom:0">
                <label class="form__label">Título</label>
                <input type="text" class="form__input edit-title" value="${oldTitle}">
            </div>
            
            <div class="form__group" style="margin-bottom:0">
                <label class="form__label">Descripción</label>
                <textarea class="form__input edit-desc" style="min-height:70px;">${oldDesc}</textarea>
            </div>

            <div class="form__group" style="margin-bottom:0">
                <label class="form__label">Estado</label>
                <select class="form__input edit-status">
                    <option value="Pendiente" ${oldStatus === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="En Progreso" ${oldStatus === 'En Progreso' ? 'selected' : ''}>En Progreso</option>
                    <option value="Completado" ${oldStatus === 'Completado' ? 'selected' : ''}>Completado</option>
                </select>
            </div>

            <div style="display:flex; gap:10px; margin-top:5px;">
                <button class="btn btn--primary btn-save" style="padding: 5px 15px; font-size: 0.8rem; background: var(--color-success);">Guardar</button>
                <button class="btn btn--primary btn-cancel" style="padding: 5px 15px; font-size: 0.8rem; background: var(--color-gray-500);">Cancelar</button>
            </div>
        </div>
    `;

    contentDiv.querySelector('.btn-cancel').onclick = () => handleUserVerify(new Event('submit'));
    
    contentDiv.querySelector('.btn-save').onclick = async () => {
        const updatedTask = {
            userId: currentUser.id,
            title: contentDiv.querySelector('.edit-title').value,
            description: contentDiv.querySelector('.edit-desc').value,
            status: contentDiv.querySelector('.edit-status').value,
            date: getCurrentTimestamp()
        };

        try {
            const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) handleUserVerify(new Event('submit'));
        } catch (error) {
            alert("Error al actualizar");
        }
    };
}

// ============================================
// 3. CREACIÓN DE ELEMENTOS
// ============================================

/**
 * Crea un nuevo elemento de mensaje en el DOM
 * @param {string} userName - Nombre del usuario
 * @param {string} message - Contenido del mensaje
 */
function createMessageElement(userName, title, message, status, taskId) {
    // TODO: Implementar la creación de un nuevo mensaje
    
    // PASO 1: Crear el contenedor principal del mensaje
    // Pista: document.createElement('div')
    // Asignar la clase 'message-card'
    
    // PASO 2: Crear la estructura HTML del mensaje
    // Puedes usar innerHTML con la siguiente estructura:
    /*
    <div class="message-card__header">
        <div class="message-card__user">
            <div class="message-card__avatar">[INICIALES]</div>
            <span class="message-card__username">[NOMBRE]</span>
        </div>
        <span class="message-card__timestamp">[FECHA]</span>
    </div>
    <div class="message-card__content">[MENSAJE]</div>
    */
    
    // PASO 3: Insertar el nuevo elemento en el contenedor de mensajes
    // Pista: messagesContainer.appendChild(nuevoElemento)
    // O usar insertBefore para agregarlo al principio
    
    // PASO 4: Incrementar el contador de mensajes
    
    // PASO 5: Actualizar el contador visual
    
    // PASO 6: Ocultar el estado vacío si está visible

    // Creación dinámica de la tarjeta de tarea
    const card = document.createElement('div');
    card.className = 'message-card';
    card.setAttribute('data-id', taskId);

    //Estructura HTML inyectada con datos dinámicos
    card.style.position = 'relative';
    card.innerHTML = `
        <div class="message-card__header" style="display: flex; align-items: center;">
            <div class="message-card__user" style="display: flex; align-items: center; gap: 10px;">
                <div class="message-card__avatar">${getInitials(userName)}</div>
                <span class="message-card__username" style="font-weight: bold; color: #333;">${userName}</span>
            </div>
            
            <div style="position: absolute; top: 10px; right: 15px; text-align: right;">
                <span class="message-card__timestamp" style="display: block; font-size: 0.75rem; color: #777; margin-bottom: 2px;">
                    ${getCurrentTimestamp()}
                </span>
                <div class="task-btns" style="display: flex; gap: 5px; margin-top: 5px;">
                    <button class="btn-edit-text" style="font-size: 0.7rem; cursor: pointer; background: var(--color-primary-lighter); border: 1px solid var(--color-primary-light); border-radius: var(--radius-sm); padding: 3px 8px; color: var(--color-primary); font-weight: bold; transition: 0.2s;">Editar</button>
                    <button class="btn-delete-text" style="font-size: 0.7rem; cursor: pointer; background: #fff5f5; border: 1px solid #feb2b2; border-radius: var(--radius-sm); padding: 3px 8px; color: var(--color-error); font-weight: bold; transition: 0.2s;">Eliminar</button>
                </div>
            </div>
        </div>

        <div class="message-card__content" style="margin-top: 15px;">
            <h4 class="task-title" style="margin: 0; color: var(--color-primary);">${title}</h4>
            <p class="task-desc" style="margin: 5px 0; color: #555;">${message}</p>
            <span class="badge" style="background: #f0f0f0; padding: 2px 10px; border-radius: 4px; font-size: 0.8rem; border: 1px solid #e0e0e0;">${status}</span>
        </div>
    `;
    //se conectan los botones edit y delete, con las funciones
    card.querySelector('.btn-delete-text').onclick = () => deleteTask(taskId, card);
    card.querySelector('.btn-edit-text').onclick = () => makeEditable(card, taskId);

    // Inserta al principio y actualizar interfaz
    messagesContainer.prepend(card);
    totalMessages++;
    updateMessageCount();
    hideEmptyState();
}


// ============================================
// 4. MANEJO DE EVENTOS
// ============================================

/**
 * Maneja el evento de envío del formulario
 * @param {Event} event - Evento del formulario
 */
async function handleUserVerify(event) {
    // TODO: Implementar el manejador del evento submit
    
    // PASO 1: Prevenir el comportamiento por defecto del formulario
    // Pista: event.preventDefault()
    event.preventDefault();

    //Limpiamos todo ANTES de la nueva consulta
    resetAppState();
    
    // PASO 2: Validar el formulario
    // Si no es válido, detener la ejecución (return)
    if (!validateForm()) return;

    const idToSearch = userNameInput.value.trim();
    
    // PASO 3: Obtener los valores de los campos
    try {
        const response = await fetch(`http://localhost:3000/users/${idToSearch}`);
        
        // PASO 4: Buscar el usuario
        if (response.ok) {
            const userFound = await response.json();
            currentUser = userFound;

            // Si es válido, limpiamos errores y llenamos la tarjeta blanca
            clearError(userNameError);
            infoEmail.textContent = userFound.email;
            infoID.textContent = userFound.id;
            
            // Mostramos la tarjeta blanca (le quitamos hidden)
            userInfoDisplay.classList.remove('hidden');
            console.log("Usuario encontrado:", userFound.name);
            taskSection.classList.remove('disabled-section');

            //Se cargan las tareas que ya existen desde la Base de datos
            const taskResponse = await fetch (`http://localhost:3000/tasks?userId=${userFound.id}`);
            const userTasks = await taskResponse.json();
            userTasks.forEach (t => {
                createMessageElement(userFound.name, t.title, t.description, t.status, t.id)
            });
        } else {
            // Si no existe, mostramos error y ocultamos la tarjeta
            showError(userNameError, "Id de usuario no encontrado en la base de datos. Registro deshabilitado.");
            userInfoDisplay.classList.add('hidden');
            taskSection.classList.add('disabled-section');
        }

    } catch (error) {
        showError(userNameError, "Error: Asegúrate de que el servidor esté activo.");
        console.error("Detalle del error:", error);
    }
}
    
async function handleTaskSubmit(event) {
    event.preventDefault();
    if(!currentUser) return;
    const title = document.getElementById('taskTitle').value;
    const desc = document.getElementById('userMessage').value;
    const status = document.getElementById('taskStatus').value;

    //Validación de campos de tarea y creación dinámica
    if (isValidInput(title) && isValidInput(desc)) {
        const newTask = {
            //La estructura de la base de datos
            userId: currentUser.id,
            title: title,
            description: desc, 
            status: status,
            date: getCurrentTimestamp()
        };
        try {
            //Enviarlo a la base de datos, para que wse guarde
            const response = await fetch ('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newTask)
            });

            //Si el server acepta se crea la tarea y la muestra en la pagina
            if (response.ok){
                const savedTask = await response.json(); // Se obtiene la targeta con el id generado por el server
                createMessageElement(currentUser.name, title, desc, status, savedTask.id)
                taskForm.reset();
            }
        } catch (error) {
            alert("Error al guardar la tarea en el servidor.");
        }
    } else {
        alert("Por favor completa todos los campos de la tarea.");
    }
}

/**
 * Limpia los errores cuando el usuario empieza a escribir
 */
function handleInputChange() {
    // TODO: Implementar limpieza de errores al escribir
    // Esta función se ejecuta cuando el usuario escribe en un campo
    // Debe limpiar el error de ese campo específico
    clearError(userNameError);
}


// ============================================
// 5. REGISTRO DE EVENTOS
// ============================================

/**
 * Aquí registramos todos los event listeners
 */

// TODO: Registrar el evento 'submit' en el formulario
// Pista: messageForm.addEventListener('submit', handleFormSubmit);

//Registramos el evento 'submit' en el formulario para la consulta
messageForm.addEventListener('submit', handleUserVerify);
taskForm.addEventListener('submit', handleTaskSubmit);

// TODO: Registrar eventos 'input' en los campos para limpiar errores al escribir
// Pista: userNameInput.addEventListener('input', handleInputChange);
// Pista: userMessageInput.addEventListener('input', handleInputChange);

//Registramos el evento 'input' para limpiar errores al escribir
userNameInput.addEventListener('input', handleInputChange);
document.addEventListener('DOMContentLoaded', () => console.log('Sistema operativo'));


// ============================================
// 6. REFLEXIÓN Y DOCUMENTACIÓN
// ============================================

/**
 * PREGUNTAS DE REFLEXIÓN:
 * 
 * 1. ¿Qué elemento del DOM estás seleccionando?
 *    R: Formularios, campos de entrada, los contenedores y contadores
 * 
 * 2. ¿Qué evento provoca el cambio en la página?
 *    R: El evento submit de los botones, verifica del usuario con la base de datos 
 *    y la creacion de la nueva tarea 
 * 
 * 3. ¿Qué nuevo elemento se crea?
 *    R: Un elemento div usando la propiedad innerHTML para mostrar los datos de la tarea
 * 
 * 4. ¿Dónde se inserta ese elemento dentro del DOM?
 *    R: Denro del #messageContainer al usar appenChild
 * 
 * 5. ¿Qué ocurre en la página cada vez que repites la acción?
 *    R: Se añade una nueva tarea al listado, el contador aumenta en 1, al ingresar un nuevo usuario la
 *    lista de tareas se limpia, y en caso de que el nuevo usuario no aparezca en la base de datos
 *    o no se le de al boton consultar, no permite registrar tareas
 */


// ============================================
// 7. INICIALIZACIÓN (OPCIONAL)
// ============================================

/**
 * Esta función se ejecuta cuando el DOM está completamente cargado
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM completamente cargado');
    console.log('📝 Aplicación de registro de mensajes iniciada');
    
    // Aquí puedes agregar cualquier inicialización adicional
    // Por ejemplo, cargar mensajes guardados del localStorage
});


// ============================================
// 8. FUNCIONALIDADES ADICIONALES (BONUS)
// ============================================

/**
 * RETOS ADICIONALES OPCIONALES:
 * 
 * 1. Agregar un botón para eliminar mensajes individuales
 * 2. Implementar localStorage para persistir los mensajes
 * 3. Agregar un contador de caracteres en el textarea
 * 4. Implementar un botón para limpiar todos los mensajes
 * 5. Agregar diferentes colores de avatar según el nombre del usuario
 * 6. Permitir editar mensajes existentes
 * 7. Agregar emojis o reacciones a los mensajes
 * 8. Implementar búsqueda/filtrado de mensajes
 */
