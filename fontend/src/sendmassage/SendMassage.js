import { Select, Input, Card, Button, Form, message } from "antd";
import axios from "axios";

const { TextArea } = Input;

export const SendMassage = () => {

  const onFinish = async (value) => {
    console.log("success", value);
    // return false;

    let phones = [];
    let phone = value.phone;
    let mess = value.massage;
    for (let i = 0; i < phone.length; i++) {
      let dataPhone = {
        phone: phone[i],
        mess: mess,
      };
      phones.push(dataPhone);
    }

    let sentJson = {
      account: "OSD",
      sender: "KONDEE",
      phones: phones,
    };

    var data = {
      username: "dsms",
      password: "dsms1234",
      detail: sentJson,
    };

    const result = await axios.post("http://localhost:3000/sendMassage", data);
    if (result) {
      console.log(result);
      message.success("This is a success message");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Card style={{ padding: 100 }}>
        <div>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ textAlign: "left" }}
          >
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                () => ({
                  validator(_, value) {
                    console.log(value);
                    let mssErr = "";
                    if (value) {
                      let input = "";
                      if (value == input) {
                        return Promise.reject(
                          new Error("Please input phone number!")
                        );
                      } else {
                        for (let i = 0; i < value.length; i++) {
                          // console.log(i);
                          let number = Number(value[i]);

                          if (isNaN(number)) {
                            mssErr = "Phone number only!";
                          } else if (value[i].length != 10) {
                            mssErr = "Not phone number type!";
                          }
                        }
                        // console.log("true");
                      }
                      // console.log("true");
                    } else {
                      // console.log("false");
                      mssErr = "Please input phone number!";
                      return Promise.reject(
                        new Error("Please input phone number!")
                      );
                    }
                    if (mssErr != "") {
                      // console.log(mssErr)
                      return Promise.reject(new Error(mssErr));
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Select
                placeholder="Phone Number"
                mode="tags"
                dropdownStyle={{ display: "none" }}
                style={{ width: "100%", textAlign: "left" }}
                tokenSeparators={[","]}
                allowClear
                onKeyDown={(e) => {
                  if (e.target.value) {
                    let value = e.target.value;
                    if (value >= 10) {
                      e.target.value = value.substring(0, 9);
                      return e;
                    }
                  }
                }}
              />
            </Form.Item>

            <Form.Item
              label="Massage"
              name="massage"
              rules={[
                () => ({
                  validator(_, value) {
                    // console.log(value);
                    if (value) {
                      // console.log("true");
                      return Promise.resolve();
                    } else {
                      // console.log("false");
                      return Promise.reject(new Error("Please input Massage!"));
                    }
                  },
                }),
              ]}
            >
              <TextArea rows={4} placeholder="Massage" allowClear />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </>
  );
};
