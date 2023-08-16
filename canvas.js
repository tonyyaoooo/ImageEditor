console.log("IM IN CANVAS.JS")
//chooseImgBtn = document.querySelector(".choose-img")



const initCanvas = (id) => {
	return new fabric.Canvas(id,{
		width:500,
		height:400,
		selection:false
	});
}

const setBackground = (url, canvas) =>{
	fabric.Image.fromURL(url, (img) => {
		canvas.backgroundImage = img; 
		canvas.renderAll();
	})
}

function ul(index) {
    console.log('click!' + index)
    
    var underlines = document.querySelectorAll(".underline");

    for (var i = 0; i < underlines.length; i++) {
        underlines[i].style.transform = 'translate3d(' + index * 100 + '%,0,0)';
    }
}

const toggleMode = (mode) => {
	if (mode == modes.pan){
		if (currentmode === modes.pan){
			currentmode = ''
		}
		else{
			currentmode = modes.pan
			canvas.isDrawingMode = false;
			canvas.renderAll()
		}
	}else if (mode === modes.drawing){
		if (currentmode === modes.drawing){
			currentmode = ''
			canvas.isDrawingMode = false;
			canvas.renderAll()
		}
		else{
			currentmode = modes.drawing
			canvas.freeDrawingBrush.color = color
			canvas.isDrawingMode = true;
			console.log(canvas.freeDrawingBrush.color)
			canvas.renderAll()
		}
	}
	console.log(mode)
}

const setPanEvents = (canvas) =>{
	canvas.on('mouse:move', (event)=>{
		if (mousePressed && currentmode === modes.pan){
			const mEvent = event.e
			canvas.setCursor("grab")
			const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
			canvas.relativePan(delta)
			canvas.renderAll()
		}else if (mousePressed && currentmode === modes.drawing){

		}
	})

	canvas.on('mouse:up', (event)=>{
		mousePressed = false;
		canvas.setCursor('default')
		canvas.renderAll()
	})
	
	canvas.on('mouse:down', (event)=>{
		mousePressed = true; 
		if (currentmode === modes.pan){
			canvas.setCursor('grab')
			canvas.renderAll()
		}
	})
}

const setColorListener = ()=>{
	const picker = document.getElementById('colorPicker')
	picker.addEventListener('change', (event) =>{
		color = event.target.value
		canvas.freeDrawingBrush.color = color
		console.log(canvas.freeDrawingBrush.color)
		canvas.renderAll()
	})
}

const clearCanvas = (canvas) =>{
	canvas.getObjects().forEach((o) =>{
		if (o!==canvas.backgroundImage){
			canvas.remove(o)
		}
	})
}

const createRect = (canvas) =>{
	console.log("rect")
	const canvCenter = canvas.getCenter()
	const rect = new fabric.Rect({
		width:100,
		height:100,
		fill: color,
		left: canvCenter.left,
		top : canvCenter.top,
		originX: 'center',
		originY: 'center'
	})
	canvas.add(rect)
	canvas.renderAll()
}

const imgAdded = (e) =>{
	console.log(e)
	const inputElem = document.getElementById('myImg')
	const file = inputElem.files[0]
	reader.readAsDataURL(file)

	//canvas.renderAll()
}

const createCirc = (canvas) =>{
	console.log("circ")
	const canvCenter = canvas.getCenter()
	const circle = new fabric.Circle({
		radius:50,
		fill: color,
		left: canvCenter.left,
		top : canvCenter.top,
		originX: 'center',
		originY: 'center'
	})
	canvas.add(circle)
	canvas.renderAll()
}

const exportImage = (canvas) =>{
	console.log(canvas.toDataURL('image/png'))
	const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

const canvas = initCanvas('canvas');
let mousePressed = false;
let color = '#000000'

let currentmode;

const modes ={
	pan: 'pan',
	drawing: 'drawing'
}

const reader = new FileReader();

setBackground("https://firebasestorage.googleapis.com/v0/b/youth-842e0.appspot.com/o/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpeg?alt=media&token=8ecee8de-b506-43e2-bf8f-d48bd8f31bef", canvas);

setPanEvents(canvas)

setColorListener()

const inputFile = document.getElementById('myImg');
inputFile.addEventListener('change', imgAdded)


reader.addEventListener("load", ()=>{
	//console.log(reader.result)
	fabric.Image.fromURL(reader.result, img=>{
		console.log(img.width)
		canvas.setWidth(img.width)
		canvas.setHeight(img.height)
		canvas.backgroundImage = img
		canvas.requestRenderAll()
	})
})

