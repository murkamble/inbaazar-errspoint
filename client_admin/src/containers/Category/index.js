import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory } from '../../actions';
import Input from '../../components/UI/Input';
import Modal from "../../components/UI/Modal";

const Category = (props) => {
    
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    

    const handleClose = () => {
        const form = new FormData();
        // const cat = { categoryName, parentCategoryId, categoryImage };
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        // console.log(cat);
        // console.log(form);
        setCategoryName('');
        setParentCategoryId('');
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        // console.log(categories);
        for(let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for(let category of categories) {
            options.push({ value: category._id, name: category.name });
            if(category.children.length > 0){
                createCategoryList(category.children, options);
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <Button style={{ margin: '4px' }} variant="primary" onClick={handleShow}>Add</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                            {/* {JSON.stringify(createCategoryList(category.categories))} */}
                        </ul>
                    </Col>
                </Row>
            </Container>


            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
                >
                <Input
                    value={categoryName}
                    placeholder={'Category Name'}
                    onChange={(e)=>setCategoryName(e.target.value)}
                />
                <select
                    className="form-control" 
                    value={parentCategoryId}
                    onChange={(e)=>setParentCategoryId(e.target.value)}
                    >
                    <option>Select Category</option>
                    {
                        createCategoryList(category.categories).map(option => 
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    }
                </select>
                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>


        </Layout>
    );
}

export default Category;