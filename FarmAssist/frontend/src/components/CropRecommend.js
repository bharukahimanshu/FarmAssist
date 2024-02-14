import React, { useEffect } from "react";
import "../css/cr.css";
import state_arr from "./state.json";
import CropResult from "./CropResult";
import { BsInfoCircleFill } from "react-icons/bs";
import InfoModal from "./InfoModal";
import { CRTemp, CRHumid, CRRain } from "../api/CRGraph";
import { CropPredict } from "../api/CropPredict";
function CropRecommend() {
  var season = ["Summer", "Kharif", "Autumn", "Rabi", "Winter", "Annual"];
  const [state, setState] = React.useState("Select State");
  const [show, setShow] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [info, setInfo] = React.useState({
    nitrogen: false,
    phosphorous: false,
    pottasium: false,
    ph: false,
    season: false,
    temperature: false,
    humidity: false,
    rainfall: false,
  });
  const [chartData, setChartData] = React.useState(null);
  const [tempData, setTempData] = React.useState(null);
  const [humidData, setHumidData] = React.useState(null);
  const [rainData, setRainData] = React.useState(null);
  const [prediction, setPrediction] = React.useState("");
  const [prediction1, setPrediction1] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [humidity, setHumidity] = React.useState("");
  const [rainfall, setRainfall] = React.useState("");
  const [unit, setUnit] = React.useState({
    nitrogenUnit: "kg/ha",
    phosphorousUnit: "kg/ha",
    pottasiumUnit: "kg/ha",
  });

  const handleChange = (event) => {
    setState(event.target.value);
  };
  useEffect(() => {
    if (temperature !== "") {
      const data = CRTemp(formdata, chartData, temperature, humidity, rainfall);
      data.then((res) => {
        setTempData(res.response.result.temp_data);
        setPrediction1(res.response.result.prediction);
      });
    }
    //eslint-disable-next-line
  }, [temperature]);
  useEffect(() => {
    if (humidity !== "") {
      const data = CRHumid(
        formdata,
        chartData,
        temperature,
        humidity,
        rainfall
      );
      data.then((res) => {
        setHumidData(res.response.result.humid_data);
        setPrediction1(res.response.result.prediction);
      });
    }
    //eslint-disable-next-line
  }, [humidity]);
  useEffect(() => {
    if (rainfall !== "") {
      const data = CRRain(formdata, chartData, temperature, humidity, rainfall);
      data.then((res) => {
        setRainData(res.response.result.rain_data);
        setPrediction1(res.response.result.prediction);
      });
    }
    //eslint-disable-next-line
  }, [rainfall]);

  const [formdata, setFormdata] = React.useState({
    nitrogen: "",
    phosphorous: "",
    pottasium: "",
    ph: "",
    season: "",
    city: "",
  });
  const handleUnitChange = (event) => {
    const { name, value } = event.target;
    setUnit((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prevValue) => {
      return {
        ...prevValue,
        [name]: value.trim(),
      };
    });
  };
  const handleInfo = (name) => {
    setInfo({
      ...info, // copy the existing state
      [name]: true, // update the property corresponding to the clicked button
    });
  };

  const handlePredict = (event) => {
    event.preventDefault();
    const ppmtokgha = 2.24;
    const percenttokgha = 22400;
    if (unit.nitrogenUnit === "ppm") {
      formdata.nitrogen = formdata.nitrogen * ppmtokgha;
    } else if (unit.nitrogenUnit === "%") {
      formdata.nitrogen = formdata.nitrogen * percenttokgha;
    }
    if (unit.phosphorousUnit === "ppm") {
      formdata.phosphorous = formdata.phosphorous * ppmtokgha;
    } else if (unit.phosphorousUnit === "%") {
      formdata.phosphorous = formdata.phosphorous * percenttokgha;
    }
    if (unit.pottasiumUnit === "ppm") {
      formdata.pottasium = formdata.pottasium * ppmtokgha;
    } else if (unit.pottasiumUnit === "%") {
      formdata.pottasium = formdata.pottasium * percenttokgha;
    }

    const res = CropPredict(formdata);
    res.then((data) => {
      document.getElementById("temp").value = data.response.result.temperature;
      document.getElementById("hum").value = data.response.result.humidity;
      document.getElementById("rain").value = data.response.result.rainfall;
      setPrediction(data.response.result.prediction[0]);
      setChartData(data.response.result.chart_data);
      setTemperature(data.response.result.temperature);
      setHumidity(data.response.result.humidity);
      setRainfall(data.response.result.rainfall);
      setShow(true);
    });
  };
  const handleReset = (event) => {
    event.preventDefault();
    document.getElementById("formdata").reset();
    setState("Select State");
    setShow(false);
  };

  return (
    <>
      <div className="cr">
        <form id="formdata">
          <div className="form-group">
            <label htmlFor="Nitrogen" style={{ marginRight: "10px" }}>
              <b>Nitrogen</b>
              <BsInfoCircleFill
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleInfo("nitrogen");
                }}
              />
              {info["nitrogen"] && (
                <InfoModal
                  title="Nitrogen"
                  body="Nitrogen is an essential macronutrient that is important for plant growth and development. It is needed for the formation of proteins, enzymes, and chlorophyll. Nitrogen is usually applied to the soil as fertilizer in the form of ammonium or nitrate. The recommended application rate for nitrogen can be measured in kilograms per hectare (kg/ha)  , parts per million (ppm)  or perecentage (%)  of nitrogen in the soil."
                  info={info}
                  setInfo={setInfo}
                  cryield={false}
                  graph={false}
                />
              )}
            </label>
            <div style={{ display: "flex" }}>
              <input
                type="number"
                className="form-control crinput "
                id="Nitrogen"
                name="nitrogen"
                placeholder="Nitrogen content"
                required
                onChange={handleFormChange}
                style={{ marginRight: "10px" }}
                autoFocus
              />
              <select
                className="form-control units"
                name="nitrogenUnit"
                id="nitrogenUnit"
                onChange={handleUnitChange}
              >
                <option value="kg/ha">kg/ha</option>
                <option value="ppm">ppm</option>
                <option value="%">%</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Phosphorous">
              <b>Phosphorous</b>
              <BsInfoCircleFill
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleInfo("phosphorous");
                }}
              />
              {info["phosphorous"] && (
                <InfoModal
                  title="Phosphorous"
                  body="Phosphorus is another essential macronutrient that is important for plant growth and development. It is needed for energy transfer, root development, and fruit and seed formation. Phosphorus is usually applied to the soil as fertilizer in the form of phosphate. The recommended application rate for phosphorus can be measured in kilograms per hectare (kg/ha)  , parts per million (ppm)  or perecentage (%)  phosphorus in the soil."
                  info={info}
                  setInfo={setInfo}
                  cryield={false}
                  graph={false}
                />
              )}
            </label>
            <div style={{ display: "flex" }}>
              <input
                type="number"
                min={0}
                className="form-control crinput "
                id="Phosphorous"
                name="phosphorous"
                placeholder="Phosphorous content"
                required
                style={{ marginRight: "10px" }}
                onChange={handleFormChange}
              />
              <select
                className="form-control units"
                name="phosphorousUnit"
                id="phosphorousUnit"
                onChange={handleUnitChange}
              >
                <option value="kg/ha">kg/ha</option>
                <option value="ppm">ppm</option>
                <option value="%">%</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Pottasium">
              <b>Pottasium</b>
              <BsInfoCircleFill
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleInfo("pottasium");
                }}
              />
              {info["pottasium"] && (
                <InfoModal
                  title="Pottasium"
                  body="Potassium is the third essential macronutrient that is important for plant growth and development. It is needed for enzyme activation, osmoregulation, and stress tolerance. Potassium is usually applied to the soil as fertilizer in the form of potassium chloride or potassium sulfate. The recommended application rate for potassium can be measured in kilograms per hectare (kg/ha) , parts per million (ppm)  or perecentage (%) of potassium in the soil."
                  info={info}
                  setInfo={setInfo}
                  cryield={false}
                  graph={false}
                />
              )}
            </label>
            <div style={{ display: "flex" }}>
              <input
                type="number"
                className="form-control crinput "
                id="Pottasium"
                name="pottasium"
                placeholder="Potassium content  "
                required
                min={0}
                style={{ marginRight: "10px" }}
                onChange={handleFormChange}
              />
              <select
                className="form-control units"
                id="pottasiumUnit"
                name="pottasiumUnit"
                onChange={handleUnitChange}
              >
                <option value="kg/ha">kg/ha</option>
                <option value="ppm">ppm</option>
                <option value="%">%</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="ph">
              <b>ph level</b>
              <BsInfoCircleFill
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleInfo("ph");
                }}
              />
              {info["ph"] && (
                <InfoModal
                  title="pH"
                  body="pH is a measure of the acidity or alkalinity of the soil. It is an important factor that affects nutrient availability and uptake by plants. The pH scale ranges from 0 to 14, with 7 being neutral. Values below 7 indicate acidity, while values above 7 indicate alkalinity. Most plants prefer a slightly acidic soil with a pH between 6 and 7. The pH of the soil can be measured using a soil test kit or a pH meter."
                  info={info}
                  setInfo={setInfo}
                  cryield={false}
                  graph={false}
                />
              )}
            </label>

            <input
              type="number"
              step="0.01"
              className="form-control"
              id="ph"
              name="ph"
              min={0}
              placeholder="Enter the value"
              required
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="season">
              <b>Crop Season</b>
              <BsInfoCircleFill
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleInfo("season");
                }}
              />
              {info["season"] && (
                <InfoModal
                  title="Season"
                  body={
                    <div>
                      <p>
                        Summer: This season usually lasts from March to June in
                        India and is characterized by high temperatures and low
                        rainfall. Crops that thrive during this season include
                        vegetables like cucumber, pumpkin, and bitter gourd, as
                        well as fruits like watermelon and muskmelon.
                      </p>
                      <p>
                        Kharif: The kharif season begins in June and ends in
                        October. This season is marked by the onset of monsoon
                        rains, which provide the necessary moisture for crops to
                        grow. Some popular kharif crops in India include paddy,
                        maize, cotton, and soybean.
                      </p>
                      <p>
                        Autumn: The autumn season, also known as the
                        "post-monsoon" season, runs from October to December.
                        This season is characterized by cool and dry weather,
                        and crops like wheat, barley, and mustard are commonly
                        grown during this time.
                      </p>
                      <p>
                        Rabi: The rabi season follows the autumn season and
                        typically lasts from November to April. This season is
                        characterized by cool temperatures and low rainfall.
                        Popular rabi crops in India include wheat, chickpeas,
                        and mustard.
                      </p>
                      <p>
                        Winter: The winter season runs from December to February
                        and is characterized by cold temperatures and low
                        rainfall. Crops like potatoes, peas, and cauliflower are
                        typically grown during this season.
                      </p>
                      <p>
                        Annual: This crop season refers to crops that can be
                        grown throughout the year. Examples of annual crops
                        include tomatoes, cucumbers, and beans. These crops are
                        typically grown in greenhouses or in areas with
                        controlled climates to ensure they have the necessary
                        temperature and moisture conditions to thrive.
                      </p>
                    </div>
                  }
                  info={info}
                  setInfo={setInfo}
                  cryield={false}
                  graph={false}
                />
              )}
            </label>
            <select
              id="season"
              className="form-control"
              name="season"
              required
              onChange={handleFormChange}
            >
              <option value="-1">Select Season</option>
              {season.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="State">
              <b>State</b>
            </label>
            <select
              id="sts"
              name="stt"
              className="form-control"
              onChange={handleChange}
              required
            >
              {Object.keys(state_arr).map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
            <label htmlFor="city">
              <b>City</b>
            </label>
            <select
              id="city"
              className="form-control"
              name="city"
              required
              onChange={handleFormChange}
            >
              <option value="">Select City</option>
              {state_arr[state].map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="temp">
              <b>Temperature</b>
              <BsInfoCircleFill
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleInfo("temperature");
                }}
              />
              {show && info["temperature"] && (
                <InfoModal
                  title="Temperature"
                  body={tempData}
                  info={info}
                  setInfo={setInfo}
                  cryield={false}
                  graph={true}
                  prediction={prediction1}
                />
              )}
            </label>
            <input
              className="form-control"
              id="temp"
              name="temp"
              placeholder="Temperature"
              disabled
              value={temperature}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hum">
              <b>Humidity</b>
              <BsInfoCircleFill
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleInfo("humidity");
                }}
              />
              {show && info["humidity"] && (
                <InfoModal
                  title="Humidity"
                  body={humidData}
                  info={info}
                  setInfo={setInfo}
                  cryield={false}
                  graph={true}
                  prediction={prediction1}
                />
              )}
            </label>
            <input
              className="form-control"
              id="hum"
              name="hum"
              placeholder="Humidity"
              disabled
              value={humidity}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rain">
              <b>Rainfall</b>
              <BsInfoCircleFill
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  handleInfo("rainfall");
                }}
              />
              {show && info["rainfall"] && (
                <InfoModal
                  title="Rainfall"
                  body={rainData}
                  info={info}
                  setInfo={setInfo}
                  cryield={false}
                  graph={true}
                  prediction={prediction1}
                />
              )}
            </label>
            <input
              className="form-control"
              id="rain"
              name="rain"
              placeholder="Rainfall"
              disabled
              value={rainfall}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-info crbtn"
              onClick={handlePredict}
            >
              Predict
            </button>
            <button
              type="reset"
              className="btn btn-danger crbtn"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      {show && (
        <>
          <CropResult
            show={showModal}
            setShow={setShowModal}
            chartData={chartData}
            prediction={prediction}
            body={` <p>The details of the crop recommendation are as follows:</p><ul><li>Nitrogen level: ${formdata.nitrogen} kg/ha</li><li>Phosphorus level: ${formdata.phosphorous} kg/ha</li><li>Potassium level: ${formdata.pottasium} kg/ha</li><li>pH level: ${formdata.ph}</li><li>Season: ${formdata.season}</li><li>Soil type: ${formdata.soil}</li><li>City: ${formdata.city}</li><li>Temperature: ${temperature}</li><li>Humidity: ${humidity}</li><li>Rainfall: ${rainfall}</li></ul>    <p>
      Recommended Crop: ${prediction}
    </p>
    <p>Please note that this is an estimate based on the information you provided. Actual result may vary depending on several factors such as pests, diseases and crop management practices.</p>
    <p>
      Thank you for using our crop recommendation service on QuickCrop. We are committed to helping you grow healthy and sustainable crops, and we hope that this recommendation will be beneficial to you.
    </p>
`}
          />
        </>
      )}
    </>
  );
}

export default CropRecommend;
