import {
  Form,
  Input,
  Button,
  InputNumber,
  DatePicker,
  Radio,
  Space,
  message
} from "antd";
import moment from "moment";
const { Item } = Form;
const Forms = ({
  userData,
  changeHandler,
  editEmployee,
  submitFunction,
  UpdateEmployee,
  resetFunction,
}) => {

  const [form] = Form.useForm();

  return (
    <>
      
      <Form form={form}>
        <Space direction="vertical" size={12}>
          <Space direction="horizontal" size={100}>
            <Item
              label="Firstname"
              rules={[
                { required: "true", message: "please provide user firstname!" },
              ]}
            >
              <Input
                placeholder="please write your firstname"
                name="firstname"
                value={userData?.firstname}
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            </Item>
            <Item
              label="Lastname"
              rules={[{ message: "please provide user lastname!" }]}
            >
              <Input
                placeholder="please write your lastname"
                name="lastname"
                value={userData?.lastname}
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            </Item>

            <Item
              label="Email"
              rules={[
                {
                  type: "email",
                  required: "true",
                  message: "please provide user email!",
                },
              ]}
            >
              <Input
                placeholder="please write your email"
                name="email"
                value={userData?.email}
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            </Item>
          </Space>
          <Space size={100}>
            <Item label="Salary" rules={[{ required: "true" }]}>
              <InputNumber
                style={{ width: 160 }}
                placeholder="please fill the salary"
                name="salary"
                value={userData?.salary}
                onChange={(e) => {
                  changeHandler(e, "salary");
                }}
              />
            </Item>

            <Item label="Birthdate">
              <DatePicker
                value={userData?.date ? moment(userData?.date) : undefined}
                name="date"
                showToday={true}
                onChange={(date, dateSting) => {
                  changeHandler(dateSting, "date");
                }}
              />
            </Item>
            <Item label="Status">
              <Radio.Group
                onChange={(e) => {
                  changeHandler(e);
                }}
                value={userData?.isactive}
                name="isactive"
              >
                <Radio value="active">Active</Radio>
                <Radio value="inactive">inActive</Radio>
              </Radio.Group>
            </Item>
          </Space>

         <Space>
         <Button
            type={UpdateEmployee ? "success" : "primary"}
            onClick={(e) => {
              UpdateEmployee ? editEmployee(e) : submitFunction(e);
            }}
          >
            {UpdateEmployee ? "update" : "Add +"}
          </Button>
          <Button
            onClick={(e) => {
              resetFunction(e)
            }}
          >
            Reset
          </Button>
         </Space>
        </Space>
      </Form>
    </>
  );
};

export default Forms;
