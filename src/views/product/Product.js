import React, {useEffect, useState} from 'react'

import {
  CAvatar, CButton,
  CCard, CCardHeader,
  CCol, CFormCheck, CFormInput, CInputGroup, CInputGroupText, CPagination, CPaginationItem,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell, CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilCheck, cilMagnifyingGlass,
  cilPen
} from '@coreui/icons'
import dataSource from '../../data/data.json';
import moment from 'moment';
import "./style.css"
import { filter, includes } from 'lodash';

const Product = () => {
  const [limit, setLimit] = useState(20)
  const [page, setPage] = useState(0)
  const [product, setProduct] = useState(dataSource.slice(0, limit))
  const [data, setData] = useState(dataSource)

  const genPagination = (dataSize, limitSize) => {
    const components = []
    for (let index=0;index<Math.ceil(dataSize/limitSize);index++){
      components.push (
        <CPaginationItem key={index}>{index+1}</CPaginationItem>
      )
    }
    return components
  }

  const changePage = (event, dataSize, limit)=>{
    const value = Math.ceil(event.target.value);
    const maxSize = Math.ceil(dataSize/limit)
    if(value<=1||value==null||value==""){
      setPage(0)
      setProduct(data.slice(0,limit))
    }
    else if (value>=maxSize-1){
      setPage(maxSize-1)
      setProduct(data.slice((maxSize-1)*limit,maxSize*limit))
    }
    else{
      setPage(value)
      setProduct(data.slice(value*limit,(value+1)*limit))
    }
  }

  const changeSearchKey = (event)=>{
    const newKey = event.target.value
    console.log("newKey==", newKey)
    if(newKey==""||newKey==null){
      setData(dataSource)
    }else{
      const results = filter(data, item => {
        const name = item?.name;
        return typeof name === 'string' && includes(name.toLowerCase(), newKey.toLowerCase());
      });
      setData(results)
    }
    setPage(0)
    setProduct(data.slice(0, limit))
  }

  useEffect(() => {
  }, [product, data])

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CInputGroup className="input-prepend">
                  <CInputGroupText>
                    <CIcon icon={cilMagnifyingGlass}/>
                  </CInputGroupText>
                  <CFormInput type="text" onChange={(event)=>changeSearchKey(event)}/>
                  <CButton color="primary">Thêm mới</CButton>
                </CInputGroup>
              </CRow>
            </CCardHeader>
            <CTable align="middle" className="mb-3 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    <CIcon icon={cilCheck}/>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Mã hàng</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">
                    Tồn đầu
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">
                    Nhập kho
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">
                    Xuất giấy thô
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">
                    Sản lượng
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">
                    Giấy lỗi
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">
                    Tồn cuối
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Khởi tạo</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Cập nhật</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Chỉnh sửa</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {product?.map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell>
                      <CFormCheck id="flexCheckDefault"/>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item?.name}</div>
                      {/*<div className="small text-body-secondary text-nowrap">*/}
                      {/*  <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}*/}
                      {/*  {item.user.registered}*/}
                      {/*</div>*/}
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item?.opening_inventory ? `${item?.opening_inventory} ${item?.inventory_unit}` : ""}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item?.input ? `${item?.input} ${item?.input_unit}` : ""}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="text-warning">{item?.output ? `${item?.output} ${item?.output_unit}` : ""}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item?.production ? `${item?.production} ${item?.production_unit}` : ""}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="text-danger">{item?.error ? `${item?.error} ${item?.error_unit}` : ""}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="text-success">{item?.closing_inventory ? `${item?.closing_inventory} ${item?.inventory_unit}` : ""}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-body-secondary text-nowrap">{item?.updated_date&&moment(item?.updated_date).format('DD/MM/YYYY HH:mm')}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-body-secondary text-nowrap">{item?.created_date&&moment(item?.created_date).format('DD/MM/YYYY HH:mm')}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CIcon icon={cilPen}/>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <CPagination align={'end'} className={"ms-3 me-3"}>
              <CPaginationItem aria-label="Previous" disabled>
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              {genPagination(data.length, limit)}
              <CPaginationItem aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
              <CFormInput className="auto-width" type="number" size="sm" placeholder="Tới trang" aria-label="Tới trang" onChange={(value)=>changePage(value, data.length, limit)}/>
            </CPagination>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Product
