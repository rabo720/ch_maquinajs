String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

var Trato_Lineas = function()
{	
	vec_variable=[];
	vec_etiquetas=[];

	this.set_etiquetas=
			function()
			{
				return this.vec1;
			};
	this.casteo_variable =
		function(variable, tipo)
		{
			if (tipo == "I")
			{
				variable=int(variable);
				return variable;
			}
			else if (tipo == "R")
			{
				variable=float(variable);
				return variable;
			}
			else if (tipo == "C")
			{
				variable=str(variable)
				return variable
			}
		};		
	this.agregar_variable=
		function(linea)
		{
			x=[linea[1],linea[3]];
			vec_variable.push(x);
		};
	this.agregar_etiqueta=
		function(linea,tam_mem)
		{
			var y = parseInt(linea[2])+(tam_mem-1);
			x=[linea[1],y];
			vec_etiquetas.push(x);
		};	
	this.buscar_variables =
		function(vec,variable)
		{
			var x=0;
			while (x < vec.length)
			{	
				
				if (vec[x][0].trim()== variable.trim())
					return true;
				x++;
			}
			return false;
		};
	this.buscar_lista=
		function(variable, lista)
		{
			var x=0;
			
			while (x< lista.length)
			{	
				
				if (lista[x] == variable)
				{
					return true;
				}
				x++;
			}
			return false;
		};	
	this.resivir_linea=
		function(lineas,tam_mem)
		{
			var oblineas = new Trato_Lineas;
			
			var depuracion_basica =
				function(Num_parametros)
				{	
					if (Num_parametros==2)
						return oblineas.buscar_variables(vec_variable,linea[1]);
					return false;
				};
			var muestre = 
				function(Num_parametros)
				{
					if (Num_parametros==2)
					{
						if (linea[1].trim() == "acumulador")
							return true;
						else
							return oblineas.buscar_variables(vec_variable,linea[1]);
					}
					return false;
				};
			var imprima = 
				function(Num_parametros)
				{
					if (Num_parametros==2)
					{
						if (linea[1].trim() == "acumulador")
							return true;
						else
							return oblineas.buscar_variables(vec_variable,linea[1]);
					}
					return false;
				};
			var vaya =
				function(Num_parametros)
				{
					if (Num_parametros==2)
						return oblineas.buscar_variables(vec_etiquetas,linea[1]);
					return false;
				};
	
			var vayasi =
				function(Num_parametros)
				{
					if (Num_parametros==3)
					{
						var x = oblineas.buscar_variables(vec_etiquetas,linea[1]);
						var y = oblineas.buscar_variables(vec_etiquetas, linea[2]);
						return (x && y);
					}
					return false;
				};		
	
			var nueva =
				function(Num_parametros)
				{
					linea[2]=linea[2].trim();
					if ((linea[2] == "I") || (linea[2] == "C") || (linea[2] == "R"))
					{	
					
						if (Num_parametros==4)
						{
							oblineas.agregar_variable(linea);
							return true;
						}
						else if (Num_parametros==3)
						{
							linea.push(0);
							oblineas.agregar_variable(linea);
							return true;
						}
						else
							return false;
					}
					else
					{
						return false;
					}
						
				};
				
			var etiqueta =
				function(Num_parametros)
				{
					if (Num_parametros==3)
					{
						oblineas.agregar_etiqueta(linea,tam_mem);
						return true;
					}  
					else
						return false;
				};
	
			var retorne =
				function(Num_parametros)
				{
					if (Num_parametros==2)
					{
						if (linea[1] > 0 && linea[1]<255)
							return true;
						else
							return false;
					}
					else
						return false;
				};		

			var dic_Palabras_Reservadas = 
			{
				"depuracion_basica":depuracion_basica,
				"muestre":muestre,
				"vaya":vaya,
				"vayasi":vayasi,
				"nueva":nueva,
				"etiqueta":etiqueta,
				"retorne": retorne,
				"imprima": imprima
			};
			
			var x = 0;
			var aux_vec1 = (lineas.length)-1;
			aux = lineas[aux_vec1].split(" ");
			if(aux[0]=="retorne")
			{
				for(x; x < lineas.length-1;x++)
				{
					var linea= lineas[x].split(" ");
					var Num_parametros= linea.length;
					if(linea[0]== "etiqueta")
					{
						if(dic_Palabras_Reservadas[linea[0]](Num_parametros)==false)
						{
							alert("se ha producido un eror en la linea" + ((x+1)+tam_mem));
							return false;
						}
					
					}	
				}
				x=0;
				var rafaga = 0; //se contara el valor rafagas.
				for(x; x < lineas.length-1;x++)
				{
					var aux_c = lineas[x][0]+lineas[x][1];
					var linea= lineas[x].split(" ");
					var Num_parametros= linea.length;
					if (linea[0]!="etiqueta" && linea[0]!="nueva")
					{
						rafaga = rafaga+1;
					}	

					if(linea[0]!= "etiqueta" && aux_c!= "//")
					{
						if (this.buscar_lista(linea[0],this.lista_basicas))
						{
							if(dic_Palabras_Reservadas["depuracion_basica"](Num_parametros)==false)
							{
								alert("No se ha podido cargar el Ch-Programa debido a un error en la linea"+ linea[0] + "linea " +x);
								return [false];
							}
						}
						else if (this.buscar_lista(linea[0],this.lista_compleja))
						{	
							if(dic_Palabras_Reservadas[linea[0]](Num_parametros)==false)
							{
								alert("No se ha podido cargar el Ch-Programa debido a un error en la linea"+ linea[0] + "linea " +x);
								return [false];
							}
					
						}	
						else
						{
							alert("palabra reservada no identificada"+linea[0] + "linea " +x);
							return [false];
						}
					}
				}
				return [true,vec_variable,vec_etiquetas,rafaga];
			}
			else
			{
				alert("el programa debe terminar un retorne");
				return false;
			}	
			
		
		};	
	this.lista_basicas=
		[  "cargue",
           "almacene",
           "lea",
           "sume",
           "reste",
           "multiplique",
           "divida",
           "potencia",
           "modulo",
           "concatene",
           "elimine",
           "extraiga",
        ];  
	this.lista_compleja= 
	[	   
		"vaya","vayasi","nueva","etiqueta","retorne","muestre", "imprima"
	];	
};

var Depurador = function()
{
	this.vec_variables=[];
	this.vec_etiquetas=[];
	this.depurar_linea = 
		function(lineas,tam_mem)
		{
			var revisar = new Trato_Lineas();
			var rafaga = 0;
			var x=0;
			rev_linea=revisar.resivir_linea(lineas,tam_mem);
			return rev_linea;
					
		};
};

var Memoria=function()
{
	this.memoria = new Array();
	this.memoria.push(0);
	this.tam_memoria = 200;

	this.iniciar_memoria = 
		function(tam)
		{
			var x = 0;
			for(x;x<tam;x++)
			{
				this.memoria.push("Sistema_Operativo");
			}
		};	
	this.set_tam_mem =
		function()
		{
			return this.tam_memoria;
		};
	this.set_mem_ocupado =
		function()
		{
			return this.memoria.length;
		};	
	this.set_acumulador = 
		function()
		{
			return this.memoria[0];
		};	
	this.return_memoria =
		function(dir)
		{
			return this.memoria[dir];
		};	
	this.insertarCHPrograma= 
		function(lineas,vec_variables)
		{
			
			var posIni = this.memoria.length;
			var x = 0;
			for (x;x<lineas.length;x++)
			{
				this.memoria.push(lineas[x]);
			}
			var posFin = this.memoria.length-1;
			x=0;
			for (x;x<vec_variables.length;x++)
			{
				
				this.memoria.push(vec_variables[x][1]);
				vec_variables[x][1]=this.memoria.length-1;
				
			}
			var posFinPro = this.memoria.length-1;
			return [posIni, posFin, posFinPro,vec_variables];
		};	
	this.set_variable =
		function(valor)
		{
			return this.memoria[valor];
		};
	this.cambiar_memoria = 
		function()
		{
			bandera = true;
			while(bandera)
			{
				var aux = prompt("digita tamaño memoria");
				if (aux > 200)
				{
					this.tam_memoria = aux;
					bandera = false;
				}
				if(aux == null)
				{
					bandera = false;
				}
			}
		};	
	this.set_memoria =
		function()
		{
			return this.memoria;
		};		
	this.intercambio = 
		function(dir_pri, dir_seg)
		{
			this.memoria[dir_pri]=this.memoria[dir_seg];
		};	
	this.refrescar = 
		function(contenido,dir)
		{
			this.memoria[dir] = contenido;
		};	
	this.insertar =
		function(dir,valor)
		{
			this.memoria[dir]=valor;
		};	
	this.suma =
		function(dir)
		{
			this.memoria[0]+=this.memoria[dir];
		};		
	this.resta =
		function(dir)
		{
			this.memoria[0]-=this.memoria[dir];
		};
	this.divicion =
		function(dir)
		{
			if(this.memoria[dir]!=0)
			{
				this.memoria[0]=this.memoria[0]/this.memoria[dir];
				return -1;
			}
			else
			{
				alert("no se puede dividir por cero");
				return this.memoria.length;
			}	
			
		};
	this.multiplicacion =
		function(dir)
		{
			this.memoria[0]=this.memoria[0]*this.memoria[dir];
		};
	this.potenciacion =
		function(dir)
		{
			this.memoria[0]=Math.pow(memoria[0],memoria[dir])
		};
	this.modulacion =
		function(dir)
		{
			this.memoria[0]=this.memoria[0]%this.memoria[dir]
		};
	this.elimine =
		function (variable)
		{
			var aux = this.memoria[0];
			var x=0;
			var aux2="";
			aux = aux.split(variable);
			for(x;x<aux.length;x++)
			{
				aux2= aux2 + aux[x]; 
			}
			this.memoria=aux2;
		};	
	this.extraiga =
		function(numero)
		{
			var aux;
			var x = numero;
			for(x;x<numero;x++)
			{
				aux = aux+this.memoria[0][x];
			}
			this.memoria[0]=aux;
		};
}
var CHMaquina = function() 
{
    this.listaProcesos = {};
    this.variables=[];
    this.etiquetas=[];
   /*
   		Explicacion Directorio.
   		this.directorio[0]: lugar donde inicia en la memoria.
   		this.directorio[1]: lugar donde temrina sin variables.
   		this.directorio[2]: lugar donde termina con variables.
   		this.directorio[3]: lugar hasta donde se ha ejecutado el programada.
   		this.directorio[4]: rafaga del programa (tamaño).
   		this.directorio[5]: tiempo de llegada.
   		this.directorio[6]: bandera terminado y no.
   		this.directorio[7]: acumulador.
   */
    this.directorio=[];
    this.pantallach =[];
    this.procesoch =[];
    this.x_global = 0;
	this.y_global = 50;
	this.tiempo_llegada = 0;
	this.tipo_ejecucion;
	this.cuantum = 5;
	this.bandera = 0;

	var depurador = new Depurador();
    var memoriaCH = new Memoria(); 

	this.getEjecucion = 
		function(tipo)
		{
			this.tipo_ejecucion = tipo;
		}
    this.iniciar_chmaquina = 
		function()
		{
			var tam_Os = (10*4)+9;
			memoriaCH.iniciar_memoria(tam_Os);
		};
    this.configuracion =
		function()
		{
			memoriaCH.cambiar_memoria();
		};
	this.buscar_variable =
		function(variable , ID_proceso)
		{
			var x = 0; 
			for(x;x< this.variables.length;x++)
			{
				var a = this.variables[x][0];
				if(a == ID_proceso)
				{
					if(this.variables[x][1]  == variable.trim())
					{
						return this.variables[x][2];
					}
				}
			}
		};
	this.buscar_etiqueta =
		function(variable,ID_proceso)
		{
			var x = 0; 
			for(x;x< this.etiquetas.length;x++)
			{
				var a = this.etiquetas[x][0];
				if(a == ID_proceso)
				{
					if(this.etiquetas[x][1]  == variable.trim())
					{
						return this.etiquetas[x][2];
					}
				}
			}
		};
    this.setMemoria = 
		function()
		{
			return memoriaCH.memoria;
		};   
    this.setDirectorio = 
		function(ID_pro)
		{
			return [this.directorio[ID_pro][0],this.directorio[ID_pro][1]];
		};
	this.setToltalDirectorio = 
		function()
		{
			return this.directorio;
		}
    this.insertar_etiqueta=
		function(vec,ID_proceso)
		{
			var x = 0;
			for(x; x < vec.length; x++)
			{
				this.etiquetas.push([ID_proceso,vec[x][0],vec[x][1]]);
			}
		};
	this.insertar_variables=
		function(vec,ID_proceso)
		{
			var x = 0;
			for(x; x < vec.length; x++)
			{
				this.variables.push([ID_proceso,vec[x][0],vec[x][1]]);
			}
		};
	this.trato_lineas = 
			function(lineas)
			{
				var vec1 = [];
				var x = 0;
				var bandera = 0;
				for(x; x < lineas.length;x++)
				{
					var linea = lineas[x].split(" ");
					var y = 0;
					var vec2 = [];
					for(y;y<linea.length;y++)
					{
						if(linea[y].trim()!="")
						{
							
							vec2.push(linea[y]);
							bandera = 1;
						}
					}
					if (bandera == 1)
					{
						vec2 = vec2.join(" ");
						vec1.push(vec2);
					}
					bandera = 0;
				}
				return vec1;
			};
    this.insertarPrograma  = 
		function(programa,ID_proceso) 
		{		
			var lineas = programa.split("\n");
			var acumulador = 0;
			lineas = this.trato_lineas(lineas);
			var rev_cod = depurador.depurar_linea(lineas,memoriaCH.set_memoria().length)
			var direc=[];
			if((lineas.length+memoriaCH.set_mem_ocupado)<= memoriaCH.set_tam_mem)
			{
				if(rev_cod[0])
				{
					this.tiempo_llegada = this.tiempo_llegada + (lineas.length/4);
					this.insertar_etiqueta(rev_cod[2],ID_proceso);
					direc=memoriaCH.insertarCHPrograma(lineas,rev_cod[1]);
					this.insertar_variables(direc[3],ID_proceso);
					this.directorio.push([direc[0],direc[1],direc[2],direc[0],rev_cod[3],this.tiempo_llegada,this.bandera,acumulador]);
					return true;
				}
			}
			return false;	
		};	
	this.cargue = 
		function(variable,ID_proceso)
		{
			var direccion = this.buscar_variable(variable, ID_proceso);
			memoriaCH.intercambio(0,direccion);			
		};
	this.nueva =
		function(variable,contenido,ID_proceso)
		{
			var direccion = this.buscar_variable(variable,ID_proceso);
			memoriaCH.refrescar(contenido,direccion);
		};
	this.almacene = 
		function(variable, ID_proceso)
		{
			
			var direccion = this.buscar_variable(variable,ID_proceso);
			memoriaCH.intercambio(direccion,0);
			
		};
	this.lea = 
		function(variable,ID_proceso)
		{
			
			var direccion = this.buscar_variable(variable, ID_proceso);
			var valor = prompt("Digite el valor: ");
			var final;
			try{
				valor = parseInt(valor);
				final = valor;
				
			}
			catch(exception){
				final = valor;
			}
			memoriaCH.refrescar(final,direccion);
			
		};
	this.sume = 
		function(variable,ID_proceso)
		{
			var direccion = this.buscar_variable(variable,ID_proceso);
			memoriaCH.suma(direccion);
			
		};	
	this.reste = 
		function(variable,ID_proceso)
		{
			var direccion = this.buscar_variable(variable,ID_proceso);
			memoriaCH.resta(direccion);
			
		};
	this.multiplique = 
		function(variable,ID_proceso)
		{
			var direccion = this.buscar_variable(variable,ID_proceso);
			memoriaCH.multiplicacion(direccion);
		};
	this.divida = 
		function(variable,ID_proceso)
		{
			var direccion = this.buscar_variable(variable,ID_proceso);
			return memoriaCH.divicion(direccion);
		};
	this.potencia = 
		function(variable,ID_proceso)
		{
			var direccion = this.buscar_variable(variable,ID_proceso);
			memoriaCH.potenciacion(direccion);
		};
	this.modulo = 
		function(variable,ID_proceso)
		{
			var direccion = this.buscar_variable(variable,ID_proceso);
			memoriaCH.modulacion(direccion);
		};
	this.concatene = 
		function(variable,ID_proceso)
		{
			this.sume(variable,ID_proceso);
		};
	this.elimine = 
		function(variable, ID_proceso)
		{
			memoriaCH.elimine(variable);
		};
	this.extraiga = 
		function(variable,ID_proceso)
		{
			memoriaCH.extraiga(variable);
		};		
	this.muestre = 
		function(variable,ID_proceso)
		{
			$("#pantalla .platilla_terminal").remove();
			if(variable.trim() == "acumulador")
			{
				this.pantallach.push(memoriaCH.set_variable(0));
			}
			else
			{
				var direccion = this.buscar_variable(variable,ID_proceso);
				this.pantallach.push(memoriaCH.set_variable(direccion));
				
			}
			var text_pantalla="";
			var x = 0;
			for(x;x< this.pantallach.length;x++)
			{
				text_pantalla+=this.pantallach[x]+"\n";
			}
			var new_element = $("<textarea class='platilla_terminal'>"+text_pantalla+"</textarea>");
			new_element.insertAfter($("#pantalla .text"));
		};
	this.imprima = 
		function()
		{
			$("#pantalla .platilla_terminal").remove();
			if(variable.trim() == "acumulador")
			{
				this.pantallach.push(memoriaCH.set_variable(0));
			}
			else
			{
				var direccion = this.buscar_variable(variable,ID_proceso);
				this.pantallach.push(memoriaCH.set_variable(direccion));
				
			}
			var text_pantalla="";
			var x = 0;
			for(x;x< this.pantallach.length;x++)
			{
				text_pantalla+=this.pantallach[x]+"\n";
			}
			var new_element = $("<textarea class='platilla_terminal'>" + "impresora: " +text_pantalla+"</textarea>");
			new_element.insertAfter($("#pantalla .text"));
			//por hacer con jquery
		};
	this.retorne = 
		function(x)
		{
			alert("aqui");
			this.directorio[x][6] = 1;
		};
	this.vaya = 
		function(variable,ID_proceso)
		{
			return this.buscar_etiqueta(variable,ID_proceso);
		};
	this.vayasi = 
		function(variable1, variable2, acum, ID_proceso)
		{
			if (acum > 0)
				return this.buscar_etiqueta(variable1,ID_proceso);
			else if (acum < 0)
				return this.buscar_etiqueta(variable2,ID_proceso);
		};
	this.terminal =
		function(ID_proceso)
		{
			$("#terminal .platilla_terminal").remove();
			var aux = "ch-programa"+ID_proceso+"\> Ejecutando....";
			this.procesoch.push(aux);
			var text_pantalla="";
			var x = 0;
			for(x;x < this.procesoch.length;x++)
			{
				text_pantalla+=this.procesoch[x]+"\n";
			}
			var new_element = $("<textarea class='platilla_terminal'>"+text_pantalla+"</textarea>");
			new_element.insertAfter($("#terminal .text"));
		};
	this.terminal_paso =
		function(ID_proceso,contenido, acumulador, PC)
		{
			$("#terminal .platilla_terminal").remove();
			var aux = "ch-programa"+ID_proceso+"\> linea ejecutada: "+ contenido + "\n ch-programa\>  acumulador :" + acumulador+ "\n ch-programa\> PC : "+PC ;
			this.procesoch.push(aux);
			var text_pantalla="";
			var x = 0;
			for(x;x < this.procesoch.length;x++)
			{
				text_pantalla+=this.procesoch[x]+"\n";
			}
			var new_element = $("<textarea class='platilla_terminal'>"+text_pantalla+"</textarea>");
			new_element.insertAfter($("#terminal .text"));
		};
	this.reset_terminal = 
		function()
		{
			$("#terminal .platilla_terminal").remove();
			this.procesoch = [""];
			var new_element = $("<textarea class='platilla_terminal'>"+this.procesoch+"</textarea>");
			new_element.insertAfter($("#terminal .text"));
		};
	this.reset_pantalla =
		function()
		{
			$("#pantalla .platilla_terminal").remove();
			this.pantallach = [""];
			var new_element = $("<textarea class='platilla_terminal'>"+this.pantallach+"</textarea>");
			new_element.insertAfter($("#pantalla .text"));
		};
	this.ejecutar_linea =
		function(y,x)
		{
			contenido = memoriaCH.return_memoria(y);
			contenido = contenido.split(" ");
			switch(contenido[0])
			{
				case "nueva":
					this.nueva(contenido[1],contenido[3],x);
				break;
				case "cargue": 
					this.cargue(contenido[1],x);
				break;
				case "almacene":
					this.almacene(contenido[1],x);
				break;
				case "vaya":
					y=(this.vaya(contenido[1],x))-1;
				break;
				case "vayasi":
					var acum = memoriaCH.set_acumulador();
					if (acum != 0)
					{
						y=(this.vayasi(contenido[1],contenido[2],acum,x))-1;
					}
				break;
				case "lea":
					this.lea(contenido[1],x);
				break;
				case "sume":
					this.sume(contenido[1],x);
				break;
				case "reste":
					this.reste(contenido[1],x);
				break;
				case "multiplique":
					this.multiplique(contenido[1],x);
				break;
				case "divida":
					var aux_div=this.divida(contenido[1],x);
					if(aux_div != -1)
					{
						y = aux_div;
					}
				break;
				case "potencia":
					this.potencia(contenido[1],x);
				break;
				case "modulo":
					this.modulo(contenido[1],x);
				break;
				case "concatene":
					this.concatene(contenido[1],x);
				break;
				case "extraiga":
					this.extraiga(contenido[1],x);
				break;
				case "muestre":
					this.muestre(contenido[1],x);
				break;
				case "imprima":
					this.imprima(contenido[1],x);
				break;
				case "retorne":
					this.retorne(x);
					alert(this.directorio[x][6]);
					return this.directorio[x][1];
				break;						
			}
				return y;
		};
	
//TIPOS DE EJECUCION.

	this.calcularProEmpezados = 
	function()
	{
		var empezados = 0;
		for (x = 0; x <this.directorio.length; x++)
		{
			if (this.directorio[x][6] == 0)
			{
				empezados = empezados+1;
			}	
		}
		return empezados;
	}
	this.ejecutarRR = 
	function()
	{
		var x = this.x_global;
		var y;
		var i;

		while (this.calcularProEmpezados()>0)
		{
			this.terminal(x);
			y = this.directorio[x][3];
			i = 0;
			memoriaCH.insertar(0,this.directorio[x][7]);
			while(i<=this.cuantum)
			{
				y = this.ejecutar_linea(y,x);
				i=i+1;
				y =y+1;	
				if (y == this.directorio[x][1])
				{
					break;
				}
			}
			this.directorio[x][7] = memoriaCH.set_acumulador();
			this.directorio[x][3]=y;
			x = x+1;
			if (this.directorio.length == x)
				x = this.x_global;
			if (this.directorio[x][6]==1)
			{
				x = x+1;	
			}
		}
		return 0;

	};
	this.ejecutarExp = 
	function()
	{

	};
	this.ejecutarNoExp = 
	function ()
	{

	};

	this.ejecutar_programas_normal=
		function()
		{
			var x = this.x_global;
			var y = this.y_global;
			var contenido;
			for(x;x<this.directorio.length;x++)
			{
				y = this.directorio[x][0];
				this.terminal(x);
				for(y;y < this.directorio[x][1];y++)
				{
					y=this.ejecutar_linea(y,x);
				}
				this.pantallach.push("\\\\\\\\\\\\\\\\Separador de Programas\\\\\\\\\\\\\\\\");
			}
			this.x_global = 0;
			this.y_global = 50;
			return 0;
		};
	this.ejecutar_programas_paso_paso =
		function()
		{
			/*alert(this.directorio.length);
			alert(this.x_global);*/
			if(this.x_global<this.directorio.length)
			{
				if(this.y_global<this.directorio[this.x_global][1])
				{
					this.y_global = this.ejecutar_linea(this.y_global,this.x_global);
					var contenido = memoriaCH.return_memoria(this.y_global);
					var acumulador = memoriaCH.set_acumulador();
					this.terminal_paso(this.x_global,contenido,acumulador,this.y_global);
					this.y_global++;
				}
				else 
				{
					this.x_global++;
					this.terminal(x);
					this.y_global=this.direccion[this.x_global][0];
					this.pantallach.push("\\\\\\\\\\\\\\\\Separador de Programas\\\\\\\\\\\\\\\\");	
				}
			}
			else 
			{
				this.x_global = 0;
				this.y_global = 50;
				if($("#control_paso").css("display")=="none")
				{
					$("#control_paso").show();

				}
				else
				{
					$("#control_paso").hide();
				}
				return 0;
			}
		};	
 };
 

 
