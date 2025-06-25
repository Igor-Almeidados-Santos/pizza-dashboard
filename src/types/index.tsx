// ==========================================
// 🏢 ORGANIZATION TYPES
// ==========================================

export interface Organization {
  id: string
  name: string
  slug: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  logo_url?: string
  settings: OrganizationSettings
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface OrganizationSettings {
  business_hours: BusinessHours
  delivery_fee: number
  minimum_order: number
  max_delivery_time: number
  auto_accept_orders: boolean
  notifications: NotificationSettings
}

export interface BusinessHours {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

export interface DaySchedule {
  is_open: boolean
  open_time: string
  close_time: string
}

export interface NotificationSettings {
  email_new_orders: boolean
  email_order_updates: boolean
  whatsapp_notifications: boolean
}

// ==========================================
// 👤 USER TYPES
// ==========================================

export type UserRole = 'super_admin' | 'admin' | 'funcionario'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organization_id?: string
  avatar_url?: string
  is_active: boolean
  last_login?: string
  created_at: string
  updated_at: string
  organization?: Organization
}

export interface UserWithOrganization extends User {
  organization: Organization
}

// ==========================================
// 📦 ORDER TYPES
// ==========================================

export type OrderStatus = 'novo' | 'em_preparo' | 'finalizado'

export interface Order {
  id: string
  organization_id: string
  order_number: string
  customer_data: CustomerData
  items: OrderItem[]
  status: OrderStatus
  total: number
  delivery_fee?: number
  discount?: number
  payment_method?: string
  estimated_time?: number
  notes?: string
  created_at: string
  updated_at: string
  organization?: Organization
}

export interface CustomerData {
  name: string
  phone: string
  email?: string
  address?: CustomerAddress
}

export interface CustomerAddress {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  zip_code: string
}

export interface OrderItem {
  id: string
  name: string
  quantity: number
  unit_price: number
  total_price: number
  notes?: string
  customizations?: ItemCustomization[]
}

export interface ItemCustomization {
  name: string
  options: string[]
  additional_price?: number
}

// ==========================================
// 🎯 PROMOTION TYPES
// ==========================================

export type DiscountType = 'percentage' | 'fixed'
export type PromotionStatus = 'active' | 'inactive' | 'expired'

export interface Promotion {
  id: string
  organization_id: string
  title: string
  description: string
  discount_type: DiscountType
  discount_value: number
  min_order_value?: number
  max_discount?: number
  valid_from: string
  valid_until: string
  is_active: boolean
  usage_count: number
  max_usage?: number
  status: PromotionStatus
  created_at: string
  updated_at: string
}

export interface PromotionSuggestion {
  id: string
  organization_id: string
  suggested_promotion: Partial<Promotion>
  reason: string
  data_analysis: string
  confidence_score: number
  is_approved?: boolean
  approved_at?: string
  created_at: string
}

// ==========================================
// 🎫 SUPPORT TYPES
// ==========================================

export type TicketStatus = 'aberto' | 'em_andamento' | 'resolvido' | 'fechado'
export type TicketPriority = 'baixa' | 'normal' | 'alta' | 'urgente'

export interface SupportTicket {
  id: string
  organization_id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  created_by: string
  assigned_to?: string
  tags?: string[]
  messages: TicketMessage[]
  created_at: string
  updated_at: string
  resolved_at?: string
  organization?: Organization
  creator?: User
  assignee?: User
}

export interface TicketMessage {
  id: string
  ticket_id: string
  user_id: string
  message: string
  is_internal: boolean
  attachments?: string[]
  created_at: string
  user?: User
}

// ==========================================
// 📊 ANALYTICS TYPES
// ==========================================

export interface Analytics {
  orders_count: number
  total_revenue: number
  average_ticket: number
  top_products: ProductSales[]
  revenue_by_period: RevenueData[]
  orders_by_status: StatusCount[]
  customer_retention: number
  growth_rate: number
}

export interface ProductSales {
  product_name: string
  quantity_sold: number
  revenue: number
  percentage: number
}

export interface RevenueData {
  period: string
  revenue: number
  orders_count: number
  average_ticket: number
}

export interface StatusCount {
  status: OrderStatus
  count: number
  percentage: number
}

// ==========================================
// 📋 MENU TYPES
// ==========================================

export interface MenuItem {
  id: string
  organization_id: string
  name: string
  description?: string
  price: number
  category_id: string
  image_url?: string
  is_available: boolean
  preparation_time?: number
  ingredients?: string[]
  customizations?: MenuCustomization[]
  created_at: string
  updated_at: string
}

export interface MenuCategory {
  id: string
  organization_id: string
  name: string
  description?: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  items?: MenuItem[]
}

export interface MenuCustomization {
  id: string
  name: string
  type: 'single' | 'multiple'
  is_required: boolean
  options: CustomizationOption[]
}

export interface CustomizationOption {
  id: string
  name: string
  additional_price: number
}

// ==========================================
// 🔔 NOTIFICATION TYPES
// ==========================================

export type NotificationType = 'order' | 'promotion' | 'system' | 'ticket'

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: NotificationType
  data?: any
  is_read: boolean
  created_at: string
}

// ==========================================
// 🎛️ DASHBOARD TYPES
// ==========================================

export interface DashboardMetrics {
  today_orders: number
  today_revenue: number
  pending_orders: number
  active_promotions: number
  monthly_growth: number
  customer_satisfaction: number
}

export interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  href: string
  color: string
}

// ==========================================
// 🔧 API TYPES
// ==========================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface WebhookPayload {
  event: string
  data: any
  organization_id: string
  timestamp: string
  signature?: string
}

// ==========================================
// 📱 FORM TYPES
// ==========================================

export interface LoginForm {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  organization_name?: string
}

export interface OrderUpdateForm {
  status: OrderStatus
  estimated_time?: number
  notes?: string
}

export interface PromotionForm {
  title: string
  description: string
  discount_type: DiscountType
  discount_value: number
  min_order_value?: number
  max_discount?: number
  valid_from: string
  valid_until: string
  max_usage?: number
}

// ==========================================
// 🎨 UI TYPES
// ==========================================

export interface SidebarItem {
  id: string
  title: string
  icon: string
  href: string
  badge?: string | number
  children?: SidebarItem[]
}

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

export interface CardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  actions?: React.ReactNode
}

// ==========================================
// 🌐 FILTER TYPES
// ==========================================

export interface OrderFilters {
  status?: OrderStatus[]
  date_from?: string
  date_to?: string
  customer_name?: string
  min_value?: number
  max_value?: number
}

export interface TicketFilters {
  status?: TicketStatus[]
  priority?: TicketPriority[]
  assigned_to?: string
  created_by?: string
  date_from?: string
  date_to?: string
}

export interface UserFilters {
  role?: UserRole[]
  is_active?: boolean
  organization_id?: string
  last_login_from?: string
}