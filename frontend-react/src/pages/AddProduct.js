import { useEffect, useState } from "react"
import { Button, Form, Table, Card, Modal } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
// import http from '../http'
import axios from "axios"

function AddProduct() {

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // fetch data start
    const [loading, setLoding] = useState(true);
    const [productlist, setProductlist] = useState([]);

    const [productInput, setProductInput] = useState({
        name: "",
        price: "",
    });
    useEffect(() => {
        axios.get('api/product').then(res => {
            // console.log(res.data);
            if (res.status === 200) {
                setProductlist(res.data.products)
            }
            setLoding(false)
        })

    }, []);

    // SET A LOADER FOR LOAD
    if (loading) {
        return (
            <div className="col-md-12 text-center mt-5">
                <img src="loader/loading.gif" className="img-fluid" style={{ width: "30%" }}></img>
            </div>
        )
    }
    // fetch data end

    const handleInput = (e) => {
        // e.presist();
        setProductInput({ ...productInput, [e.target.name]: e.target.value })
    };
    const productSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: productInput.name,
            price: productInput.price
        };

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/add-product`, data).then(res => {

            });
        });
    }

    // insert data end


    return (
        <div>
            <h1 className="mt-2 text-center">Product Page</h1>
            <div className="container">
                {/* <Link to="" className="btn btn-success float-end">View Product</Link>
                <div className="clr"></div> */}
                <div className="col-md-6 offset-3 mt-5">

                    <Card>
                        <Card.Header><Card.Title>Add Product</Card.Title></Card.Header>
                        <Card.Body>
                            <Form onSubmit={productSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter product name" name="name" value={productInput.name}
                                        onChange={handleInput} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Product Price</Form.Label>
                                    <Form.Control type="text" placeholder="Enter product name" name="price" value={productInput.price}
                                        onChange={handleInput} />
                                </Form.Group>

                                <Button variant="primary w-100" type="submit">
                                    Add Product
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-10 offset-1 mt-5 mb-5">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#Id</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productlist.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Link to={`/update/${product.id}`} className="btn btn-primary me-2">Edit</Link>
                                        <Button variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* <Modal show={show} onHide={handleClose}>
                        
                        <Modal.Header closeButton></Modal.Header>
                        <Card>
                            <Card.Header><Card.Title>Update Product</Card.Title></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <Form onSubmit={productSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter product name" name="name" value={productInput.name}
                                                onChange={handleInput} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Product Price</Form.Label>
                                            <Form.Control type="text" placeholder="Enter product name" name="price" value={productInput.price}
                                                onChange={handleInput} />
                                        </Form.Group>

                                        <Button variant="primary w-100" type="submit">
                                            Update Product
                                        </Button>
                                    </Form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Modal> */}
                </div>
            </div>
        </div>
    )
}

export default AddProduct