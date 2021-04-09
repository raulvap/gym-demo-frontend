import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";

// --- API ---
import {
  addMisaInfoApi,
  updateMisaInfoApi,
} from "../../../../api/registroMisa";
import { getAccessTokenApi } from "../../../../api/auth";

// --- COMPONENTS ---

import {
  Form,
  Input,
  InputNumber,
  Button,
  TimePicker,
  Checkbox,
  Select,
  notification,
  DatePicker,
  Tooltip,
} from "antd";

import "./AddEditMisaInfo.scss";
const format = "HH:mm";
const { Option } = Select;

export default function AddEditMisaInfo(props) {
  const { misaData, setIsVisibleModal, setReloadMisaData } = props;
  const [misaInfo, setMisaInfo] = useState({});

  useEffect(() => {
    if (misaData) {
      misaData.date = moment(misaData.date);
      misaData.hour = moment(misaData.hour, "HH:mm:ss");

      setMisaInfo(misaData);
    } else {
      setMisaInfo({});
    }
  }, [misaData]);

  const addMisaInfo = (event) => {
    // event.preventDefault();

    if (!misaInfo.categoria || !misaInfo.hour) {
      notification["error"]({
        message:
          "Se requiere Categoría y Hora para registrar información de Misa",
      });
    } else {
      const token = getAccessTokenApi();

      addMisaInfoApi(token, misaInfo)
        .then((response) => {
          notification["success"]({
            message: response.message,
          });

          //       // setMisaInfo(misaInfo, (0: false));

          setReloadMisaData(true);
          setIsVisibleModal(false);
          setMisaInfo({});
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
        });
    }
  };

  const editMisaInfo = (event) => {
    // event.preventDefault();

    delete misaInfo.domIcon;
    delete misaInfo.lunIcon;
    delete misaInfo.marIcon;
    delete misaInfo.mieIcon;
    delete misaInfo.jueIcon;
    delete misaInfo.vieIcon;
    delete misaInfo.sabIcon;

    if (!misaInfo.categoria || !misaInfo.hour) {
      notification["error"]({
        message:
          "Se requiere Categoría y Hora para registrar información de Misa",
      });
    } else {
      const token = getAccessTokenApi();

      updateMisaInfoApi(token, misaInfo._id, misaInfo)
        .then((response) => {
          const typeNotification =
            response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.message,
          });

          setReloadMisaData(true);
          setIsVisibleModal(false);
          setMisaInfo({});
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
        });
    }
  };

  function onChangeCategoria(e) {
    if (e === "normal") {
      setMisaInfo({ ...misaInfo, categoria: e, name: null, date: null });
    } else {
      setMisaInfo({ ...misaInfo, categoria: e });
    }
  }

  return (
    <Form onFinish={misaData ? editMisaInfo : addMisaInfo}>
      <div className='misa-form'>
        <div className='misa-form__categoria'>
          <p>Categoría</p>
          <Form.Item>
            <Select
              placeholder='Categoría'
              value={misaInfo.categoria}
              onChange={(e) => onChangeCategoria(e)}>
              <Option value='Normal'>Normal</Option>
              <Option value='Especial'>Especial</Option>
            </Select>
          </Form.Item>

          {misaInfo.categoria === "Especial" ? (
            <div className='categoria-details'>
              <Form.Item>
                <Input
                  placeholder='Nombre del Evento'
                  value={misaInfo.name}
                  onChange={(e) =>
                    setMisaInfo({ ...misaInfo, name: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item>
                <Tooltip
                  placement='topRight'
                  title='Si aparece "Invalid Date" hacer click en "Today" dentro del calendario'>
                  <DatePicker
                    onChange={(date) =>
                      setMisaInfo({ ...misaInfo, date: date })
                    }
                    value={moment(misaInfo.date)}
                  />
                </Tooltip>
              </Form.Item>
            </div>
          ) : null}
        </div>

        <div className='misa-form__left'>
          <div className='misa-form__input'>
            <p>Hora</p>
            <Form.Item>
              <TimePicker
                placeholder='Seleccionar Hora'
                format={format}
                value={misaInfo.hour}
                onChange={(time) => setMisaInfo({ ...misaInfo, hour: time })}
                defaultOpenValue={moment("08:00:00", "HH:mm:ss")}
              />
            </Form.Item>
          </div>

          <div className='misa-form__input'>
            <p>
              Total
              <br />
              Lugares Disponibles
            </p>
            <Form.Item>
              <InputNumber
                min={1}
                value={misaInfo.maxSeats}
                onChange={(value) =>
                  setMisaInfo({ ...misaInfo, maxSeats: value })
                }
              />
            </Form.Item>
          </div>
          <div className='misa-form__input'>
            {misaInfo.categoria === "Especial" ? null : (
              <div>
                <p>Días que se repite:</p>
                <div className='misa-form__days'>
                  <div className='misa-form__input'>
                    <p>Dom</p>
                    <Form.Item>
                      <Checkbox
                        defaultChecked={false}
                        checked={misaInfo.dom}
                        onChange={(e) =>
                          setMisaInfo({ ...misaInfo, dom: e.target.checked })
                        }
                      />
                    </Form.Item>
                  </div>

                  <div className='misa-form__input'>
                    <p>Lun</p>
                    <Form.Item>
                      <Checkbox
                        defaultChecked={false}
                        checked={misaInfo.lun}
                        onChange={(e) =>
                          setMisaInfo({ ...misaInfo, lun: e.target.checked })
                        }
                      />
                    </Form.Item>
                  </div>

                  <div className='misa-form__input'>
                    <p>Mar</p>
                    <Form.Item>
                      <Checkbox
                        defaultChecked={false}
                        checked={misaInfo.mar}
                        onChange={(e) =>
                          setMisaInfo({ ...misaInfo, mar: e.target.checked })
                        }
                      />
                    </Form.Item>
                  </div>

                  <div className='misa-form__input'>
                    <p>Mié</p>
                    <Form.Item>
                      <Checkbox
                        defaultChecked={false}
                        checked={misaInfo.mie}
                        onChange={(e) =>
                          setMisaInfo({ ...misaInfo, mie: e.target.checked })
                        }
                      />
                    </Form.Item>
                  </div>

                  <div className='misa-form__input'>
                    <p>Jue</p>
                    <Form.Item>
                      <Checkbox
                        defaultChecked={false}
                        checked={misaInfo.jue}
                        onChange={(e) =>
                          setMisaInfo({ ...misaInfo, jue: e.target.checked })
                        }
                      />
                    </Form.Item>
                  </div>

                  <div className='misa-form__input'>
                    <p>Vie</p>
                    <Form.Item>
                      <Checkbox
                        defaultChecked={false}
                        checked={misaInfo.vie}
                        onChange={(e) =>
                          setMisaInfo({ ...misaInfo, vie: e.target.checked })
                        }
                      />
                    </Form.Item>
                  </div>

                  <div className='misa-form__input'>
                    <p>Sáb</p>
                    <Form.Item>
                      <Checkbox
                        defaultChecked={false}
                        checked={misaInfo.sab}
                        onChange={(e) =>
                          setMisaInfo({ ...misaInfo, sab: e.target.checked })
                        }
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {misaData
              ? "Actualizar Registro para Misa"
              : "Crear Registro para Misa"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
