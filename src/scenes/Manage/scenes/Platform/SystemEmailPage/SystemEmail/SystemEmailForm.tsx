import React, {FC, useEffect, useState} from 'react';
import {
  Col,
  Form,
  Row,
  Select,
  Input,
  Checkbox,
  Radio,
  Button,
  InputNumber,
  Space,
  Tag,
  Spin,
  notification,
  DatePicker
} from 'antd';
import type { NotificationPlacement } from 'antd/es/notification';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import 'react-quill/dist/quill.snow.css';
import {toJS} from 'mobx';
import {
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN, GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_COL_TWO_THIRDS_ROW_SPAN,
} from 'constants/ui';
import {maxLength, maxValue, minValue, required} from 'tools/formRules';
import {textWithLine, mailFormat, inputNumberParser, inputNumberFormatter} from 'tools';
import Paragraph from 'antd/lib/typography/Paragraph';
import {systemEmailStore} from "../../../../../../store";
import {VoidFn} from 'types';
import {
  sentCDFIEmail,
  sentTestEmail
} from "../../../../../../dataManagement/operations/emailOperations";
import { observer } from "mobx-react"
import {format} from "date-fns";
import styles from "./SystemEmailForm.module.scss";
import {useHistory} from "react-router-dom";
import { SendCDFIEmailModal } from '../SendCDFIEmailModal/SendCDFIEmailModal';

export interface SystemEmailFormProps {
  onFinish: (values: any) => void;
  formId: string;
  onCancel: VoidFn;
}

export const SystemEmailForm: FC<SystemEmailFormProps> = observer( ({
  onFinish,
  formId,
  onCancel,
}) => {

  /**
   * Hooks
   */
  const [form] = Form.useForm();
  const history = useHistory();
  const [emailText, setEmailText] = useState('')
  const [templateText, setTemplateText] = useState('')
  const [isReplaceText, setIsReplaceText] = useState(false)
  const [oldValue, setOldValue] = useState('')
  const [recipientGroupState, setRecipientGroup] = useState('')
  const [dependentOn, setDependentOn] = useState('')
  const [numberOfDays, setNumberOfDaysOn] = useState(null)
  const [isZeroDays, setIsZeroDays] = useState(false)
  const [categoriesId, setCategoriesId] = useState(null)
  const [isFindCategoryID, setIsFindCategoryID] = useState(false)
  const [isLoadData, setIsLoadData] = useState(false)
  const [loadingEmailCategory, setLoadingEmailCategory] = useState(false);
  const [loadingRecipientsList, setLoadingRecipientsList] = useState(false);
  const [senderEmailId, setSenderEmailId] = useState(undefined);
  const [isCloseModalEmail, setIsCloseModalEmail] = useState<any>(false);
  const [updateDefaultText, setUpdateDefaultText] = useState(false);
  const [isDefaultText, setIsDefaultText] = useState(false);
  const [isDefaultTextEmailTemplate, setIsDefaultTextEmailTemplate] = useState(false);
  const [isEmailTemplate, setIsEmailTemplate] = useState(false);
  const [triggerDateEmails, setTriggerDate] = useState(undefined);

  const {
    emailCategories,
    getRecipientsGroup,
    recipientsGroup,
    getEmailReminders,
    reminders,
    getEmailTrigger,
    trigger,
    systemEmail,
    setIsEditForm,
    emailTemplate,
    getEmailTemplate,
    setEmailTemplate,
    getEmailCategories,
    isEditCustomEmail,
    setCcEmailList,
    ccEmailList,
    bccEmailList,
    setBccEmailList,
    systemEmails,
    getSystemEmail,
    getSenderEmails,
    senderEmails,
    getGenerateRecipientsList,
    getGenerateEligibleCDFIList,
  } = systemEmailStore;

  /**
   * Handlers
   */
   const onClickSentTestEmail = async () => {
    if (form.getFieldValue('subject') === undefined) {
      openNotification('bottomRight')
      return;
    }
    const data = {
      email: form.getFieldValue('sendTestEmail'),
      emailCategoryId: categoriesId,
      subject: form.getFieldValue('subject'),
      text: textWithLine(emailText).replaceAll('<p', '<p style="margin: 0 !important"'),
      emailSenderId: senderEmailId,
    }
    await sentTestEmail(data);
  };

  const onClickSentCDFIEmail = async () => {
    if (form.getFieldValue('subject') === undefined) {
      openNotification('bottomRight')
      return;
    }
    const data = {
      emailCategoryId: categoriesId,
      subject: form.getFieldValue('subject'),
      text: textWithLine(emailText).replaceAll('<p', '<p style="margin: 0 !important"'),
      emailSenderId: senderEmailId,
    }
    await sentCDFIEmail(data);
    setIsCloseModalEmail(false);
  };

  const onChanceEmailCategory = (value: number, option: any) => {
    form.setFieldsValue({ emailCategoryId: value})

    // @ts-ignore
    if(option?.templateid !== undefined) {
      setLoadingEmailCategory(true);
      getEmailTemplate(option?.templateid).then(() => {
        setLoadingEmailCategory(false);
        setIsEmailTemplate(true)
      });
    } else {
      setEmailTemplate({
        fileName: "Default Template",
        templateBody: "<p>${text}</p>"
      })
    }
    // @ts-ignore
    setCategoriesId(value)
  }

   const onChangeEmailText = (value: string) => {
    setEmailText(value)
    form.setFieldsValue({text: value})
    if (emailTemplate?.templateBody === undefined) {
      setOldValue(value)
      setIsReplaceText(true)
      return '';
    }

    if(isReplaceText && !updateDefaultText) {
      setTemplateText(textWithLine(templateText.replace(oldValue, value)))
    }  else if (emailTemplate.defaultText !== undefined && updateDefaultText && systemEmail === null) {
      setTemplateText(textWithLine(templateText.replace(oldValue, value)))
      setUpdateDefaultText(false)
    } else if (emailTemplate.defaultText !== undefined && isDefaultTextEmailTemplate && systemEmail === null) {
      setTemplateText(textWithLine(emailTemplate.templateBody.replace(oldValue, emailText)))
      setIsReplaceText(true)
    } else if (emailTemplate.defaultText !== undefined && !isDefaultTextEmailTemplate && systemEmail === null) {
      setTemplateText(textWithLine(emailTemplate.templateBody.replace('<p>${text}</p>', emailTemplate.defaultText)))
      setUpdateDefaultText(true)
      setIsReplaceText(true)
    } else {
      setTemplateText(textWithLine(templateText.replace('${text}', value)))
      setIsReplaceText(true)
    }
    setOldValue(value)
  }

  const addCcEmail = () => {
    if(String(form.getFieldValue('ccEmailList')).match(mailFormat) === null) {
      return;
    }
    const newTodos = [...ccEmailList, form.getFieldValue('ccEmailList') ];
    // @ts-ignore
    setCcEmailList(newTodos);
    form.setFieldsValue({ccEmailList: ''})
  }

  const deleteCcEmail = (item: string) => {
    setCcEmailList(ccEmailList.filter(value => value !== item))
  }

  const addBccEmail = () => {
    if(String(form.getFieldValue('bccEmailList')).match(mailFormat) === null) {
      return;
    }

    const newBccEmailList = [...bccEmailList, form.getFieldValue('bccEmailList') ];
    // @ts-ignore
    setBccEmailList(newBccEmailList);
    form.setFieldsValue({bccEmailList: ''})
  }

  const deleteBccEmail = (item: string) => {
    setBccEmailList(bccEmailList.filter(value => value !== item))
  }

  const onClickGenerateRecipientsList = () => {
    const data = {
      recipientGroup: form.getFieldValue('recipientGroup'),
      dependentOn: getReminderType()[0].reminderType,
      numberOfDays: form.getFieldValue('numberOfDays'),
      isBeforeDate: form.getFieldValue('isBeforeDate') === 'on' ? true : form.getFieldValue('isBeforeDate'),
      triggerType: getTriggerType()[0].triggerType,
      triggerDate: triggerDateEmails,
    }
    setLoadingRecipientsList(true)
    getGenerateRecipientsList(data).then(() => {
      setLoadingRecipientsList(false);
    });
  }

  const onClickGenerateEligibleCDFIList = () => {
    setLoadingRecipientsList(true)
    getGenerateEligibleCDFIList().then(() => {
      setLoadingRecipientsList(false);
    });
  }

  const onChangeTriggerDate = (date: any, dateString: any) => {
    setTriggerDate(dateString)
  };
   
  /**
   * Variables
   */
  const getCurrentSenderEmail = () => {    
    return senderEmails?.find(item => item.id === systemEmail?.emailSenderId)
  }
 
  const getCurrentReminders = () => {
    if(recipientGroupState === '') {
      return [{
        reminderType: "",
        description: ""
      }]
    } else {
      return toJS(reminders).filter( item => {
        if(recipientGroupState === 'CDFIs' && item.reminderType === "UPLOAD_REMINDERS") {
          return item
        } else if (recipientGroupState === 'Subscribers') {
          return item
        }
      })
    }
  }

  const getCurrentEmailCategories = () => {
    const currentReminder = reminders.find(item => item.description === dependentOn);
    return emailCategories.filter((item) => {
      if(item.dependentOn?.description === currentReminder?.description) {
        return item;
      }
    })
  }

  const triggerDate = () => {
    if( dependentOn === '' ) {
      return []
    }
    return dependentOn === "Subscription Reminders" ? toJS(trigger).filter((item) => {
      if (dependentOn === "Subscription Reminders" && item.description === 'Subscription expiration date')  {
        return item;
      }
    }) : toJS(trigger).filter((item) => {
      if (dependentOn !== "Subscription Reminders" && item.description !== 'Subscription expiration date')  {
        return item;
      }
    })
  }

  const getCurrentCategory = () => {
    return emailCategories.find((item) => {
      if(item.id === systemEmail?.emailCategoryId) {
        if(!isFindCategoryID) {
          // @ts-ignore
          setCategoriesId(item?.id)
          setIsFindCategoryID(true)
        }
        return item;
      }
    })
  }

  const getValueEmailText = () => {
    if(emailTemplate?.defaultText !== undefined && isDefaultText && systemEmail === null) {
      setEmailText(emailTemplate?.defaultText);
      setIsDefaultText(false);
      return emailTemplate?.defaultText;
    } else if(emailText) {
      return emailText
    } else {
      return '';
    }
  }

  const getValueEmailTemplate = () => {
    if(emailTemplate?.defaultText !== undefined && emailTemplate?.templateBody !== undefined && isDefaultTextEmailTemplate) {
      setTemplateText(textWithLine(emailTemplate?.templateBody.replace('<p>${text}</p>', emailTemplate.defaultText)))
      setIsDefaultTextEmailTemplate(false);
      setOldValue(emailTemplate.defaultText)
      return textWithLine(templateText.replace(oldValue, emailText));
    } else {
      return templateText;
    }
  }

  const onChanceSenderEmail = (value: number) => {
    form.setFieldsValue({ senderEmail: value})
    // @ts-ignore
    setSenderEmailId(value);
  }

  const openNotification = (placement: NotificationPlacement) => {
    notification.info({
      message: 'Please enter Email Subject',
      placement,
    });
  };

  const sortArray = (a: any, b: any) => {
    let x = a.email.toLowerCase();
    let y = b.email.toLowerCase();

    if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    };

  const getReminderType = () => {
    return toJS(reminders).filter(item => item.description === form.getFieldValue('dependentOn'))
  }

  const getTriggerType = () => {
    return toJS(trigger).filter(item => item.description === form.getFieldValue('triggerType'))
  }

   const isDisabledGenerateRecipientsListBtn = () => {
    return form.getFieldValue('recipientGroup') === undefined || form.getFieldValue('dependentOn') === undefined ||
      form.getFieldValue('numberOfDays') === undefined || form.getFieldValue('triggerType') === undefined ||
      triggerDateEmails === undefined;
  }

  const isDisabledGenerateEligibleCDFIListBtn = () => {
    return form.getFieldValue('recipientGroup') === undefined || form.getFieldValue('dependentOn') === undefined ||
      form.getFieldValue('numberOfDays') === undefined || form.getFieldValue('triggerType') === undefined
  }

  const defaultValues = {
    id: systemEmail?.id,
    subject: systemEmail?.subject,
    text: systemEmail?.text,
    recipientGroup: systemEmail?.recipientGroup,
    emailCategoryId: getCurrentCategory()?.name,
    dependentOn: systemEmail?.dependentOn?.description,
    isBeforeDate: `${systemEmail?.numberOfDays === 0 && systemEmail?.isBeforeDate ? 'on' : systemEmail?.isBeforeDate === undefined ? true : systemEmail?.isBeforeDate}`,
    isEnabled: systemEmail?.isEnabled,
    lastUpdated: systemEmail?.lastUpdated,
    lastUpdatedBy: systemEmail?.lastUpdatedBy,
    numberOfDays:systemEmail?.numberOfDays || 0,
    triggerType: systemEmail?.triggerType?.description,
    senderEmail: getCurrentSenderEmail()?.email ?? 'info@aerisinsight.com',
  }

   /**
   * Effects
   */
   useEffect(() => {
    if(defaultValues.recipientGroup !== undefined && !isLoadData) {
      form.setFieldsValue(defaultValues)
      if(systemEmail?.bccEmailList !== undefined) {
        setBccEmailList(systemEmail?.bccEmailList);
      }
      if(systemEmail?.ccEmailList !== undefined) {
        setCcEmailList(systemEmail?.ccEmailList);
      }
      setIsLoadData(true)
      setTemplateText(textWithLine(templateText.replace('${text}', defaultValues?.text !== undefined ? defaultValues?.text : '')))
    }
  }, [form, defaultValues])

  useEffect(() => {
    if(templateText && defaultValues?.text) {
      setTemplateText(textWithLine(templateText.replace('${text}', emailText)))
    }
  }, [templateText])

  useEffect(() => {
    if(isZeroDays) {
      // @ts-ignore
      setNumberOfDaysOn(0);
      form.setFieldsValue({numberOfDays: 0})
    }
  }, [isZeroDays])

  useEffect(() => {
    if(emailTemplate?.templateBody !== undefined) {
      setTemplateText(emailText ?
        textWithLine( emailTemplate?.templateBody.indexOf('${text}') ?
          emailTemplate?.templateBody.replace('${text}', emailText) :
          emailTemplate?.templateBody.replace(oldValue, emailText))  :
        emailTemplate?.templateBody as string
      );
      setIsDefaultText(true);
    }
    if( emailTemplate?.defaultText !== undefined && systemEmail === null) {
      setIsDefaultTextEmailTemplate(true);
    }
  }, [emailTemplate])

  useEffect(() => {
    if ( emailTemplate?.defaultText !== undefined && emailTemplate?.templateBody !== undefined && isEmailTemplate) {
      setEmailText(emailTemplate.defaultText);
      setTemplateText(textWithLine(emailTemplate?.templateBody.replace('${text}', emailText)))
      setIsEmailTemplate(false);
    }
  }, [isEmailTemplate, emailTemplate])

  useEffect(() => {
    getRecipientsGroup();
    getEmailReminders();
    getEmailTrigger();
    getEmailCategories();
    getSenderEmails();

    const emailCategory = emailCategories.find(item => item.id === systemEmail?.emailCategoryId)
    if(emailCategory !== undefined && emailCategory.emailTemplateId !== undefined) {
      getEmailTemplate(emailCategory.emailTemplateId)
    } else if (isEditCustomEmail) {
      setEmailTemplate({
        fileName: "Default Template",
        templateBody: systemEmail?.text !== undefined ? `<p>${systemEmail?.text}</p>` : '<p>${text}</p>'
      })
    }

    // @ts-ignore
    setDependentOn(systemEmail?.dependentOn?.description);
    // @ts-ignore
    setNumberOfDaysOn(systemEmail?.numberOfDays);
    if(systemEmail?.numberOfDays === 0 && systemEmail?.isBeforeDate) {
      setIsZeroDays(true);
    }
    // @ts-ignore
    setSenderEmailId(systemEmail?.emailSenderId)
    setRecipientGroup(systemEmail?.recipientGroup || '');
    setEmailText((systemEmail?.text && systemEmail?.text) || '')
  }, [systemEmail])

  useEffect(() => {
    if ( isEditCustomEmail ) {
      setTemplateText(textWithLine(templateText.replace('${text}', emailText)))
    }
  }, [isEditCustomEmail, templateText])

  useEffect(() => {
    if ( isEditCustomEmail ) {
      // @ts-ignore
      setCcEmailList(systemEmail.ccEmailList)
      // @ts-ignore
      setBccEmailList(systemEmail.bccEmailList)
    }
  }, [isEditCustomEmail])

  useEffect(() => {
    if(systemEmails.length === 0 && history.location.pathname.split('/')[1] === 'system-email' ) {
      const systemEmailId = +history.location.pathname.split('/')[2];
      getSystemEmail(systemEmailId);
    }
  }, [systemEmails])

  return (
    <Form
      id={formId}
      onFinish={onFinish}
      layout="vertical"
      onValuesChange={() => setIsEditForm(true)}
      form={form}
      initialValues={defaultValues}
    >
      {loadingRecipientsList ? <div className={styles.spinRecipientsList}><Spin spinning /></div> : null}
      {loadingEmailCategory ? <div className={styles.spin}><Spin spinning /></div> : null}
      <div className={styles.formEmail}>
        <Row gutter={[GRID_COL_QUARTER_ROW_SPAN, 0]} className={styles.wrapperBlock}>
          <Col span={GRID_COL_FULL_ROW_SPAN} >
            <Form.Item name="isEnabled" valuePropName="checked">
              <Checkbox>Enabled</Checkbox>
            </Form.Item>
          </Col>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              name="recipientGroup"
              label="Recipient Group"
              rules={[{ required: true, message: 'Field is required' }]}
            >
              <Select
                placeholder="Select recipient group field"
                options={toJS(recipientsGroup).map((field) => ({
                  value: field,
                }))}
                onChange={(value: string): void => {
                  setRecipientGroup(value);
                  setDependentOn('');
                  form.setFieldsValue({ dependentOn: null })
                  form.setFieldsValue({ emailCategoryId: undefined})
                  form.setFieldsValue({ triggerType: undefined})
                }}
              />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              name="dependentOn"
              label="Dependent on which field?"
              rules={[{ required: true, message: 'Field is required' }]}
            >
              <Select
                placeholder="Select Email Dependent field"
                options={getCurrentReminders().map((value) => ({
                  value: value?.description,
                }))}
                disabled={(recipientGroupState) === ''}
                onChange={(value: string): void => {
                  setDependentOn(value)
                  form.setFieldsValue({ emailCategoryId: undefined})
                  form.setFieldsValue({ triggerType: undefined})
                }}
              />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_FULL_ROW_SPAN}>
            <Form.Item
              name="id"
              style={{display: 'none'}}
            >
            </Form.Item>
            <Form.Item
              name="emailCategoryId"
              label="Email Category"
              rules={[{ required: true, message: 'Please select category!' }]}
            >
              <Select
                placeholder="Select Email Category"
                optionFilterProp="label"
                disabled={dependentOn === '' || dependentOn === undefined}
                options={getCurrentEmailCategories()?.map((category: any) => ({
                  value: category?.id,
                  label: category.name,
                  templateid: category?.emailTemplateId,
                  defaulttext: category?.defaultText
                }))}
                onChange={onChanceEmailCategory}
              />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_FULL_ROW_SPAN}>
            <Form.Item name="subject" label="Email Subject" rules={[required(), maxLength(300)]}>
              <Input placeholder="Enter Email Subject" max={300}/>
            </Form.Item>
          </Col>
          <div className={styles.wrapperDate}>
            <Col>
              <Form.Item
                name="numberOfDays"
                label="Days"
                validateTrigger="onBlur"
                rules={[{ required: true, message: 'Field is required' }, minValue(0),  maxValue(365)]}>
                <InputNumber
                  placeholder="0"
                  style={{width: '60px'}}
                  min={0}
                  parser={inputNumberParser}
                  formatter={inputNumberFormatter}
                  value={numberOfDays as unknown as number}
                  onChange={(value): void => {
                    // @ts-ignore
                    setNumberOfDaysOn(value)
                  }}
                  disabled={isZeroDays}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="isBeforeDate"
                label="Choose Period"
                rules={[
                  {
                    required: true,
                    message: "Field is required",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="on" onClick={()=>{setIsZeroDays(true);}}>On</Radio>
                  <Radio value="true" onClick={()=>{setIsZeroDays(false);}}>Before</Radio>
                  <Radio value="false" onClick={()=>{setIsZeroDays(false);}}>After</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN} className={styles.dateInput}>
              <Form.Item name="triggerType" label="Date" rules={[required()]}>
                <Select
                  style={{width: '100%'}}
                  placeholder="Select Date"
                  disabled={dependentOn === '' || dependentOn === undefined}
                  options={triggerDate().map((value) => ({
                    value: value.description,
                  }))}
                />
              </Form.Item>
            </Col>
          </div>
          <Col span={GRID_COL_FULL_ROW_SPAN}>
            <div>
              <p className={styles.title}>Email Text</p>
              <p className={styles.infoText}>Instructions:</p>
              <p className={styles.description}>Type the text you would like to include in the body of the email into
                the field. To add an email address, type it in the body of the text where you want it to be included.
                The email recipient will be able to click the email link to open an email to that address.
              </p>
            </div>
            <Form.Item name="text" rules={[{ required: true, message: 'Field is required' }]} className={styles.emailTextWrapper}>
              <div>
                <EditorToolbar />
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  onChange={onChangeEmailText}
                  value={getValueEmailText()}
                  className={styles.formatText}
                />
              </div>
            </Form.Item>
          </Col>
          <Col span={GRID_COL_FULL_ROW_SPAN}>
            <Form.Item
              name="id"
            >
            </Form.Item>
            <Form.Item
              name="senderEmail"
              label="Sender's Email Address"
              rules={[{ required: false }]}
            >
              <Select
                placeholder="Select Sender Email Address"
                optionFilterProp="label"
                options={senderEmails?.sort(sortArray).map((item: any) => ({
                  value: item.id,
                  label: item.email,
                }))}
                onChange={onChanceSenderEmail}
              />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item
              name="ccEmailList"
              label="Copy Email Address(es)"
              validateTrigger="onBlur"
              rules={[
                {
                  required: false,
                  pattern: new RegExp(mailFormat),
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input
                placeholder="Enter email address to be copied"
                style={{width: '100%'}}
                maxLength={300}
                autoComplete="new-email"
              />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_THIRD_ROW_SPAN} className={styles.button}>
            <Button
              type="primary"
              onClick={addCcEmail}
              style={{ width: '100%' }}
            >
              Add CC Email
            </Button>
          </Col>
          <Col span={GRID_COL_FULL_ROW_SPAN} className={styles.copyEmailWrapper}>
            {ccEmailList.map((item, index) => (
              <Tag key={`${item}-${index}`} closable onClose={()=>deleteCcEmail(item)}>{item}</Tag>
            ))}
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item
              name="bccEmailList"
              label="Blind Copy Email Address(es)"
              validateTrigger="onBlur"
              rules={[
                {
                  required: false,
                  pattern: new RegExp(mailFormat),
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input
                placeholder="Enter email address to be blind-copied"
                style={{width: '100%'}}
                maxLength={300}
                autoComplete="new-email"
              />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_THIRD_ROW_SPAN} className={styles.button}>
            <Button
              type="primary"
              onClick={addBccEmail}
              style={{ width: '100%' }}
            >
              Add BCC Email
            </Button>
          </Col>
          <Col span={GRID_COL_FULL_ROW_SPAN} className={styles.copyEmailWrapper}>
            {bccEmailList.map((item, index) => (
              <Tag key={`${item}-${index}`} closable onClose={()=>deleteBccEmail(item)}>{item}</Tag>
            ))}
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item
              name="sendTestEmail"
              label="Test Recipient’s Email address "
              validateTrigger="onBlur"
              rules={[
                {
                  required: false,
                  pattern: new RegExp(mailFormat),
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input
                placeholder="Enter email address for test email"
                style={{width: '100%'}}
                maxLength={300}
                autoComplete="new-email"
              />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_THIRD_ROW_SPAN} className={styles.button}>
            <Button
              type="primary"
              onClick={onClickSentTestEmail}
              style={{ width: '100%' }}
            >
              Send Test Email
            </Button>
          </Col>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              name="triggerDate"
              label="Generate Recipients List As of Date"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <DatePicker onChange={onChangeTriggerDate} picker="date"/>
            </Form.Item>
          </Col>
          <Col span={GRID_COL_HALF_ROW_SPAN} className={styles.button}>
            <Button
              type="primary"
              onClick={onClickGenerateRecipientsList}
              style={{ width: '100%' }}
              disabled={isDisabledGenerateRecipientsListBtn()}
            >
              Generate Recipients List
            </Button>
          </Col>
          <Col span={GRID_COL_THIRD_ROW_SPAN} className={styles.button}>
            <Button
              type="primary"
              onClick={onClickGenerateEligibleCDFIList}
              style={{ width: '100%' }}
              disabled={isDisabledGenerateEligibleCDFIListBtn()}
            >
              Generate eligible CDFI List
            </Button>
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN} className={styles.button}>
            <p className={styles.infoTextList}>Click here to download a list of all CDFI Users who are active and have “Upload Reminders” turned
              on in their profile.</p>
          </Col>
          <Col span={GRID_COL_QUARTER_ROW_SPAN} className={styles.button}>
            <Button
              type="primary"
              onClick={(): void => setIsCloseModalEmail(true)}
              style={{ width: '100%' }}
              disabled={isDisabledGenerateEligibleCDFIListBtn()}
            >
              Send CDFI Email
            </Button>
          </Col>
          <SendCDFIEmailModal visible={isCloseModalEmail} onClose={(): void => setIsCloseModalEmail(false)} onClick={onClickSentCDFIEmail}/>
          <Col span={GRID_COL_FULL_ROW_SPAN} className={styles.updatedWrapper}>
            { systemEmail?.lastUpdated ?
              <Col span={GRID_COL_HALF_ROW_SPAN}>
                <Paragraph>Last Updated: {format(new Date(systemEmail?.lastUpdated), 'P')}</Paragraph>
              </Col> : null }
            { systemEmail?.lastUpdatedBy ?
              <Col span={GRID_COL_HALF_ROW_SPAN}>
                <Paragraph>Updated By: {systemEmail?.lastUpdatedBy}</Paragraph>
              </Col> : null }
          </Col>
        </Row>
        <Row gutter={[GRID_COL_THIRD_ROW_SPAN, 0]} className={styles.wrapperBlock}>
          <Col span={GRID_COL_FULL_ROW_SPAN}>
            <div className={styles.exampleEmailWrapper}>
              <p className={styles.title}>Email Example {emailTemplate === null ? '' : `(${emailTemplate.fileName})`}</p>
              <ReactQuill
                theme="snow"
                value={getValueEmailTemplate()}
                className={styles.formatText}
                readOnly={true}
              />
            </div>
          </Col>
        </Row>
      </div>
      <Row gutter={[GRID_COL_FULL_ROW_SPAN, 0]} >
        <Col span={GRID_COL_FULL_ROW_SPAN} className={styles.wrapperButtons}>
          <Form.Item>
            <Space>
              <Button
                id="cancelEquationEditButton"
                type="default"
                htmlType="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button id="addEquationButton" type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
})
