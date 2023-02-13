import axios from "axios";
import { useEffect, useState } from "react"
import { Card, Form, Button } from "react-bootstrap"
import { useParams, useMatch} from 'react-router-dom';



function UpdateProduct(props) {
    const [productInput, setProduct] = useState([]);
    const handleInput = (e) => {
        setProduct({ ...productInput, [e.target.name]: e.target.value })
    };
    const params = useParams();

    const product_id = params.id;
    useEffect(()=>{
        getProduct();
    },[params.id])

    async function getProduct(){
        await axios.get(`api/update-product/${product_id}`).then(res=>{
            if(res.status === 200){
                console.log(res.data);
                setProduct(res.data.products);
            }
        })
    }
    

    return (
        <div>
            <h1 className="mt-2 text-center">Update Product Page</h1>
            <div className="container">
                {/* <Link to="" className="btn btn-success float-end">View Product</Link>
                <div className="clr"></div> */}
                <div className="col-md-6 offset-3 mt-5">

                    <Card>
                        <Card.Header><Card.Title>Update Product</Card.Title></Card.Header>
                        <Card.Body>
                            <Form >
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
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct