/* eslint-disable @typescript-eslint/no-explici */
import axiosInstance from './axios'

class APIService {
  static fetcher = url => axiosInstance.get(url).then(res => res?.data)

  static post = (url, body, config = {}) => axiosInstance.post(url, body, config).then(res => res)

  static update = (url, id, body) => axiosInstance.patch(`${url}/${id}`, body).then(res => res)

  static delete = (url, id) => axiosInstance.delete(`${url}/${id}`).then(res => res)

  static login = payload => axiosInstance.post('/auth/admin/login', payload).then(res => res)

  static forgotPassword = payload => axiosInstance.post('/auth/admin/send-password-reset', payload).then(res => res)

  static sendOTP = payload => axiosInstance.post('/auth/admin/resend-otp', payload).then(res => res)

  static resetPassword = payload => axiosInstance.put('/auth/admin/reset-password', payload).then(res => res)

  static verifyOTP = payload => axiosInstance.post('/auth/admin/verify', payload).then(res => res)

  static getProfile = () => axiosInstance.get('/admins/current/profile').then(res => res)

  static updateUser = payload => axiosInstance.put('/users/info/update', payload).then(res => res)

  static deleteUser = id => axiosInstance.put(`/users/${id}/delete`, {}).then(res => res)

  static getApplications = page => axiosInstance.get(`/transactions/all?page=${page}`).then(res => res)

  static multiImagesUpload = payload => axiosInstance.put('/images/upload', payload).then(res => res)

  static singleImageUpload = payload => axiosInstance.put('/image/upload', payload).then(res => res)

  static addAdmin = payload => axiosInstance.post('/admins/admin/create', payload).then(res => res)

  static suspendAdmin = id => axiosInstance.post(`/admins/admin/${id}/suspend`, {}).then(res => res)

  static pardonAdmin = id => axiosInstance.post(`/admins/admin/${id}/pardon`, {}).then(res => res)

  static deleteAdmin = id => axiosInstance.post(`/admins/admin/${id}/delete`, {}).then(res => res)

  static updateApplication = (id, payload) => axiosInstance.post(`/application/${id}/update`, payload).then(res => res)

}

export default APIService
