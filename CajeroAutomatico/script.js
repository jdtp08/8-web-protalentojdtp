var cuentas = [
    { nombre: "Juan", saldo: 200 },
    { nombre: "Roberto", saldo: 290 },
    { nombre: "Adrian", saldo: 67 }
  ];
  
  var cuentaSeleccionada;
  
  function login() {
    var cuentaIndex = document.getElementById("cuentas").value;
    var password = document.getElementById("password").value;
  
    if (password === "1234") {
      cuentaSeleccionada = cuentas[cuentaIndex];
      document.getElementById("login").style.display = "none";
      document.getElementById("operaciones").style.display = "block";
      document.getElementById("saldo").textContent = "Saldo actual: $" + cuentaSeleccionada.saldo;
      resetearMensaje();
      ocultarTransaccion();
    } else {
      document.getElementById("mensaje").textContent = "Password incorrecto. Intenta de nuevo.";
    }
  }
  
  function consultarSaldo() {
    document.getElementById("saldo").textContent = "Saldo actual: $" + cuentaSeleccionada.saldo;
    resetearMensaje();
    ocultarTransaccion();
  }
  
  function ingresarMonto() {
    resetearMensaje();
    document.getElementById("transaccion").style.display = "block";
    document.getElementById("monto").placeholder = "Ingresa el monto a ingresar";
  }
  
  function retirarMonto() {
    resetearMensaje();
    document.getElementById("transaccion").style.display = "block";
    document.getElementById("monto").placeholder = "Ingresa el monto a retirar";
  }
  
  function realizarTransaccion() {
    var monto = parseInt(document.getElementById("monto").value);
  
    if (isNaN(monto) || monto <= 0) {
      document.getElementById("resultado").textContent = "Ingresa un monto válido.";
      return;
    }
  
    var nuevoSaldo;
  
    if (document.getElementById("monto").placeholder === "Ingresa el monto a ingresar") {
      nuevoSaldo = cuentaSeleccionada.saldo + monto;
  
      if (nuevoSaldo > 990) {
        document.getElementById("resultado").textContent = "El monto ingresado supera el límite de $990.";
        return;
      }
    } else {
      nuevoSaldo = cuentaSeleccionada.saldo - monto;
  
      if (nuevoSaldo < 10) {
        document.getElementById("resultado").textContent = "El monto a retirar excede el límite permitido.";
        return;
      }
    }
  
    cuentaSeleccionada.saldo = nuevoSaldo;
    document.getElementById("saldo").textContent = "Saldo actual: $" + cuentaSeleccionada.saldo;
    document.getElementById("resultado").textContent = "Transacción realizada con éxito.";
  }
  
  function resetearMensaje() {
    document.getElementById("mensaje").textContent = "";
    document.getElementById("resultado").textContent = "";
  }
  
  function ocultarTransaccion() {
    document.getElementById("transaccion").style.display = "none";
  }
  