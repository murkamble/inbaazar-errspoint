import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory, updateCategories } from '../../actions';
import Input from '../../components/UI/Input';
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown
} from "react-icons/io";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const Category = (props) => {

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const category = useSelector(state => state.category);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
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
        for (let category of categories) {
            myCategories.push(
                {
                    value: category._id,
                    label: category.name,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const updateCategory = () => {
        setUpdateCategoryModal(true);
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);

        console.log({ checked, expanded, categories, checkedArray, expandedArray });
    }


    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }

    }

    
    const updateCategoriesForm = () => {
        const form = new FormData();
        expandedArray.forEach(( item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId: '');
            form.append('type', item.type);
        });
        checkedArray.forEach(( item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId: '');
            form.append('type', item.type);
        });
        dispatch(updateCategories(form))
        .then(result => {
            if(result){
                dispatch(getAllCategory())
            }
        })
        
        
        setUpdateCategoryModal(false);
    }


    const renderUpdateCategoriesModal = () => {
        return (
            <Modal
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                modalTitle={'Update Category'}
                size="lg"
            >
                <Row>
                    <Col>
                        <h6>Expanded</h6>
                    </Col>
                </Row>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) =>
                        <Row>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={'Category Name'}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.parentId}
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                                >
                                    <option>Select Category</option>
                                    {
                                        createCategoryList(category.categories).map(option =>
                                            <option key={option.value} value={option.value}>{option.name}</option>
                                        )
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                >
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="Product">Product</option>
                                    <option value="Page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }
                <h6>Checked Category</h6>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                        <Row>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={'Category Name'}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.parentId}
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                >
                                    <option>Select Category</option>
                                    {
                                        createCategoryList(category.categories).map(option =>
                                            <option key={option.value} value={option.value}>{option.name}</option>
                                        )
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                >
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="Product">Product</option>
                                    <option value="Page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }
                {/* <input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}
            </Modal>
        );
    }



    const renderAddCategoModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
            >
                <Input
                    value={categoryName}
                    placeholder={'Category Name'}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}
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
        );
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
                        {/* <ul>
                            {renderCategories(category.categories)}
                            {/* {JSON.stringify(createCategoryList(category.categories))} 
                        </ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button style={{ margin: '2px' }} variant="danger" >Delete</Button>
                        <Button style={{ margin: '2px' }} variant="primary" onClick={updateCategory}>Edit</Button>

                    </Col>
                </Row>
            </Container>

            {renderAddCategoModal()}
            {renderUpdateCategoriesModal()}

        </Layout>
    );
}

export default Category;