import React, { useState } from "react";
import moment from "moment";
import "moment/locale/es";

import {
  Form,
  Input,
  Button,
  TimePicker,
  Select,
  notification,
  DatePicker,
  Space,
  Tooltip,
} from "antd";

import "./_AddFilterModal.scss";
const format = "HH:mm";
const dateFormat = "ddd DD/MMM/YY";
const { Option } = Select;

export default function AddFilterModal(props) {
  const { setFilter, setIsVisibleModal, setCountRegistros } = props;

  const [filterData, setFilterData] = useState({});

  const addFilter = (event) => {
    // event.preventDefault();

    if (!filterData.categoria || !filterData.hour || !filterData.day) {
      notification["error"]({
        message:
          "Se requieren todos los campos para filtrar información de Misa",
      });
    } else {
      filterData.month = 1 + moment(filterData.day).month();
      filterData.year = moment(filterData.day).year();
      filterData.day = moment(filterData.day).date();
      filterData.hour = moment(filterData.hour).format("LT");
      setCountRegistros(0);
      setFilter(filterData);
      setIsVisibleModal(false);
      setFilterData({});
    }
  };

  function onChangeCategoria(e) {
    if (e === "Normal") {
      setFilterData({ ...filterData, categoria: e, eventName: false });
    } else {
      setFilterData({ ...filterData, categoria: e, eventName: null });
    }
  }

  return (
    <div className='add-filter-modal'>
      <Form labelCol={{ span: 9 }} onFinish={addFilter}>
        <div className='add-filter-modal__categoria'>
          <Form.Item label='Categoría'>
            <Select
              placeholder='Seleccionar Categoría'
              value={filterData.categoria}
              onChange={(e) => onChangeCategoria(e)}>
              <Option value='Normal'>Normal</Option>
              <Option value='Especial'>Especial</Option>
            </Select>
          </Form.Item>

          {filterData.categoria === "Especial" ? (
            <Form.Item label='Nombre de la Misa'>
              <Input
                placeholder='Nombre de la Misa Especial'
                value={filterData.eventName}
                onChange={(e) =>
                  setFilterData({ ...filterData, eventName: e.target.value })
                }
              />
            </Form.Item>
          ) : null}
        </div>

        <Form.Item
          label='Fecha'
          // onClick={handleFormValuesChange}
        >
          <Tooltip
            placement='left'
            title='Si aparece "Invalid Date" hacer click en "Today" dentro del calendario'>
            <Space direction='vertical' format={dateFormat}>
              <DatePicker
                format={dateFormat}
                //   defaultValue={moment("2015-01-01", "YYYY-MM-DD")}

                value={filterData.day}
                onChange={(date) =>
                  setFilterData({
                    ...filterData,
                    day: moment(date),
                  })
                }
              />
            </Space>
          </Tooltip>
        </Form.Item>

        <Form.Item label='Hora'>
          <TimePicker
            placeholder='Seleccionar Hora'
            format={format}
            value={filterData.hour}
            onChange={(timeString) =>
              setFilterData({ ...filterData, hour: timeString })
            }
            defaultOpenValue={moment("08:00:00", "HH:mm:ss")}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Filtrar Registros
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
