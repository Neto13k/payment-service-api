import pool from '../db/db';
import { Coupon } from '../types/index';

async function getAllCoupons(): Promise<Coupon[]> {
    try {
        const result = await pool.query('SELECT * FROM coupons');
        return result.rows;
    } catch (error) {
        console.error('Erro ao buscar cupons:', error);
        throw error;
    }
}

async function getCouponById(id: number): Promise<Coupon | null> {
    try {
        const result = await pool.query('SELECT * FROM coupons WHERE id = $1', [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erro ao buscar cupom por ID:', error);
        throw error;
    }
}

async function createCoupon(coupon: Coupon): Promise<Coupon> {
    try{
        const result = await pool.query(
            'INSERT INTO coupons (code, discount_type, discount_value, expires_at, usage_limit, active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [coupon.code, coupon.discount_type, coupon.discount_value, coupon.expires_at, coupon.usage_limit, coupon.active]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Erro ao criar cupom:', error);
        throw error;
    }
}
async function updateCoupon(id: number, coupon: Coupon): Promise<Coupon | null> {
    try {
        const result = await pool.query(
            'UPDATE coupons SET code = $1, discount_type = $2, discount_value = $3, expires_at = $4, usage_limit = $5, used_count = $6, active = $7 WHERE id = $8 RETURNING *',
            [coupon.code, coupon.discount_type, coupon.discount_value, coupon.expires_at, coupon.usage_limit, coupon.used_count, coupon.active, id]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erro ao atualizar cupom:', error);
        throw error;
    }
}

async function deleteCoupon(id: number): Promise<boolean> {
    try {
        const result = await pool.query('DELETE FROM coupons WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    } catch (error) {
        console.error('Erro ao deletar cupom:', error);
        throw error;
    }
}

export { getAllCoupons, getCouponById, createCoupon, updateCoupon, deleteCoupon };