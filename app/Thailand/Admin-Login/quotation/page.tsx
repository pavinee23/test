"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' })
  const [items, setItems] = useState([{ desc: '', qty: 1, price: 0 }])
  const [discount, setDiscount] = useState(0)
  const [taxRate, setTaxRate] = useState(7)
  const [errors, setErrors] = useState<string[]>([])
  const [totals, setTotals] = useState({ subtotal: 0, tax: 0, total: 0 })

  useEffect(() => {
    const subtotal = items.reduce((s, it) => s + it.qty * Number(it.price || 0), 0)
    const afterDiscount = Math.max(0, subtotal - Number(discount || 0))
    const tax = (afterDiscount * Number(taxRate || 0)) / 100
    setTotals({ subtotal, tax, total: afterDiscount + tax })
  }, [items, discount, taxRate])

  function addItem() {
    setItems([...items, { desc: '', qty: 1, price: 0 }])
  }

  function updateItem(i: number, key: string, value: any) {
    const copy = [...items]
    // @ts-ignore
    copy[i][key] = key === 'desc' ? value : Number(value)
    setItems(copy)
  }

  function validate() {
    const e: string[] = []
    if (!customer.name) e.push('กรุณาใส่ชื่อลูกค้า / Please enter customer name')
    items.forEach((it, idx) => {
      if (!it.desc) e.push(`รายการที่ ${idx + 1} ต้องมีคำอธิบาย / Item ${idx + 1} needs description`)
      if (it.qty <= 0) e.push(`จำนวนสำหรับรายการ ${idx + 1} ต้องมากกว่า 0 / Qty must be > 0`)
    })
    setErrors(e)
    return e.length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    console.log({ customer, items, discount, taxRate, totals })
    alert('Quotation saved (demo)')
  }

  const styles: Record<string, React.CSSProperties> = {
    container: { padding: 24, fontFamily: 'Inter, system-ui, Arial', maxWidth: 960, margin: 'auto' },
    card: { background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    input: { width: '100%', padding: 8, borderRadius: 6, border: '1px solid #e2e8f0' },
    label: { fontSize: 14, fontWeight: 600, marginBottom: 6 },
    row: { display: 'flex', gap: 12, marginBottom: 12 },
    small: { fontSize: 12, color: '#6b7280' },
    btn: { padding: '8px 12px', borderRadius: 6, border: 'none', cursor: 'pointer' }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>ใบเสนอราคา / Quotation</h2>
        <div>
          <button style={{ ...styles.btn, marginRight: 8 }} onClick={() => router.back()}>ย้อนกลับ / Back</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={{ marginBottom: 16 }}>
          <div style={styles.label}>ข้อมูลลูกค้า - Customer info</div>
          <div style={styles.row}>
            <input placeholder="ชื่อลูกค้า / Customer name" value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} style={styles.input} />
            <input placeholder="โทรศัพท์ / Phone" value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})} style={styles.input} />
          </div>
          <textarea placeholder="ที่อยู่ / Address" value={customer.address} onChange={e=>setCustomer({...customer,address:e.target.value})} style={{...styles.input,height:80}} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={styles.label}>รายละเอียดสินค้า - Product details</div>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input placeholder="รายละเอียด / Description" value={it.desc} onChange={e=>updateItem(i,'desc',e.target.value)} style={{...styles.input, flex: 2}} />
              <input type="number" min={1} value={it.qty} onChange={e=>updateItem(i,'qty',e.target.value)} style={{...styles.input, width: 100}} />
              <input type="number" min={0} value={it.price} onChange={e=>updateItem(i,'price',e.target.value)} style={{...styles.input, width: 140}} />
            </div>
          ))}
          <button type="button" onClick={addItem} style={{ ...styles.btn, marginTop: 8 }}>เพิ่มรายการ / Add item</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={styles.label}>ส่วนลด / Discount (THB)</div>
            <input type="number" min={0} value={discount} onChange={e=>setDiscount(Number(e.target.value))} style={styles.input} />
            <div style={{ height: 12 }} />
            <div style={styles.label}>VAT (%)</div>
            <input type="number" min={0} value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} style={styles.input} />
          </div>

          <div style={{ width: 280, background: '#f8fafc', borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 700 }}>สรุปยอด - Summary</div>
            <div style={styles.small}>Subtotal: {totals.subtotal.toFixed(2)} ฿</div>
            <div style={styles.small}>Discount: {Number(discount).toFixed(2)} ฿</div>
            <div style={styles.small}>Tax: {totals.tax.toFixed(2)} ฿</div>
            <div style={{ marginTop: 8, fontSize: 18, fontWeight: 800 }}>Total: {totals.total.toFixed(2)} ฿</div>
          </div>
        </div>

        {errors.length > 0 && (
          <div style={{ marginTop: 12, color: '#b91c1c' }}>
            {errors.map((er, idx) => <div key={idx}>{er}</div>)}
          </div>
        )}

        <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
          <button type="submit" style={{ ...styles.btn, background: '#064e3b', color: '#fff' }}>บันทึก / Save</button>
          <button type="button" onClick={()=>{setCustomer({name:'',phone:'',address:''});setItems([{desc:'',qty:1,price:0}]);setDiscount(0)}} style={{ ...styles.btn }}>ล้าง / Reset</button>
        </div>
      </form>
    </div>
  )
}

