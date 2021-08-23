var exp = require('express') ;
const multer = require("multer") ;

var ap = exp() ;

ap.use(exp.static(__dirname + '/frontend')) ;

ap.get('/', function(req, res)
{
    res.sendFile(__dirname + '/frontend/html/index.html');
}) ;

ap.get('/signin', function(req, res)
{
    res.sendFile(__dirname + '/frontend/html/Sign_In.html');
}) ;

ap.get('/register', function(req, res)
{
    res.sendFile(__dirname + '/frontend/html/register.html');
}) ;

ap.get('/upload', function(req, res)
{
    res.sendFile(__dirname + '/frontend/html/upload.html');
}) ;

var storage = multer.diskStorage({ 
	destination: function (req, file, cb) { 
        // Uploads is the Upload_folder_name 
		cb(null, "uploads") 
	}, 
	filename: function (req, file, cb) { 
	cb(null, file.fieldname + "-" + Date.now()+".jpg") 
	} 
}) 
	
const maxSize = 1 * 1000 * 1000; 
	
var upload = multer({ 
	storage: storage, 
	limits: { fileSize: maxSize }, 
	fileFilter: function (req, file, cb){ 
	
		// Set the filetypes, it is optional 
		var filetypes = /jpeg|jpg|png|pdf/; 
		var mimetype = filetypes.test(file.mimetype); 

		var extname = filetypes.test(path.extname( 
					file.originalname).toLowerCase()); 
		
		if (mimetype && extname) { 
			return cb(null, true); 
		} 
	
		cb("Error: File upload only supports the "
				+ "following filetypes - " + filetypes); 
	} 

// mypic is the name of file attribute 
}).single("mypic");	 
	
ap.post("/uploadresume",function (req, res, next) { 
		
	upload(req,res,function(err) { 

		if(err) { 

			res.send(err) 
		} 
		else { 

			res.sendFile(__filename+"loading.gif") 
		} 
	}) 
}) 

var port = process.env.PORT || 3000 ;
ap.listen(port, function()
{
    console.log("Site Running on http://localhost:" + 3000) ;
}) ;