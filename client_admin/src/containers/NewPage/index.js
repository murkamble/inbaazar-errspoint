import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { Container, Row, Col } from "react-bootstrap";
import linearCategories from "../../helpers/linearCategories";
import { useSelector } from "react-redux";

const NewPage = () => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');


    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category])


    const handleBannerImages = (e) => {
        console.log(e);
    }

    const handleProductImages = (e) => {
        console.log(e);
    }


    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
            >
                <Container>
                    <Row>
                        <Col>
                            <select
                                className="form-control "
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {
                                    categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)
                                }
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                                className=""
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Page Desc'}
                                className=""
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input 
                                type='file'
                                name="banners"
                                className="form-control "
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input 
                                type='file'
                                name="products"
                                className="form-control "
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal>
        )
    }

    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create Page</button>
        </Layout>
    );
}

export default NewPage;