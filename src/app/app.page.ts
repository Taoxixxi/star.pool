import { AppConfig } from "./app.config";
import { LoadingController } from 'ionic-angular';
import { AppUtil } from "./app.util";
import { sprintf } from "sprintf-js";
import { BigNumber } from "bignumber.js";

var langs = {
    'cn': {
        'COIN': 'SECF',
        'COIN_NAME': '资产币',
        'COIN2': 'SECF',
        'COIN2_NAME': '资产币',
        'JIFEN': '资产券',
        'JIFEN_TO': '资产券兑资产币',
        'JIFEN_ASSET': 'SECP总额',
        'JIFEN_ASSET_CAN': '已激活SECP',
        'JIFEN_PRICE': '价值',
        'account_jifen_list': '资产券账务',

        'sys_ok': '确定',
        'sys_cancel': '取消',
        'sys_ann': '公告',
        'value_null': '(空)',
        'input_about': '备注',
        'input_optional': '(可选)',
        'input_please': '请输入',
        'input_eg': '如: ',
        'supply_quantity':'提供数量',
        'exchange_num':'兑换数量',

        'tab0': '首页',
        'tab1': '集市',
        'tab2': '资产',
        'tab3': '我的',
        /*TAB1*/
        'podium_title': '市场行情',
        'podium_asset_default': '默认资产',
        'podium_asset_custom': '自定义资产',
        'podium_trade_max': '最高',
        'podium_trade_min': '最低',
        'podium_trade_amount': '量',
        "no_content": "暂无内容",
        "current": "当前",
        /*TAB2*/
        'wallet_input': '充入',
        'wallet_output': '提出',
        'wallet_transfer': '转币',
        'wallet_message': '消息',

        'wallet_info_my_asset': '我的资产',
        'wallet_info_account': '账户信息',
        'wallet_binding_info_title': 'ETH地址',
        'wallet_info_vip': '普通会员',
        'wallet_info_detail': '详情',
        'wallet_self': '本币',

        'wallet_core': '资产',
        'wallet_input_record': '充入记录',
        'wallet_output_record': '提出记录',
        'wallet_trade_history': '交易历史',
        'wallet_face_input': '当面收币',

        'wallet_tools': '工具',
        'wallet_pay_account': '收款账户',
        'wallet_normal_address': '常用地址',
        'wallet_base_info': '基本信息',
        'wallet_query_account': '账号查询',
        'wallet_query_asset': '资产查询',
        'wallet_query_currencies': '币种查询',
        'wallet_query_selectdetail': '账号查询详情',
        'wallet_query_seletail': '查询详情',
        'wallet_query_cod': '提出详情',
        'wallet_query_Collect': '收币',

        'wallet_honour': '承兑商',
        'wallet_honour_apply': '申请加入',
        'wallet_honour_manage': '承兑管理',
        'wallet_honour_rate': '费率',
        'wallet_honour_ratio': '兑换比率',
        'wallet_honour_online': '每笔兑换上限',
        'wallet_honour_offline': '每笔兑换下限',
        'wallet_money_account': '收款账户',
        "my_wallet_input": "我的充入",
        "wallet_input_in": "充入中",
        "wallet_dealing": "处理中",
        "wallet_input_history": "充入历史",
        "wallet_input_transfer": "待转账",
        'wallet_output_my': '我的提出',
        'wallet_output_doing': '提出中',
        'wallet_output_refund': '退款中',
        'wallet_output_history': '提出历史',
        'wallet_output_done': '已完成',
        'wallet_output_checkhis': '历史记录选择',
        'wallet_output_allhis': '全部历史',
        'wallet_output_ok': '确定',
        'wallet_output_cancel': '取消',
        'wallet_output_transfer': '转账',
        'wallet_output_Limit': '限价单',
        'wallet_output_orderset': '订单撮合',
        'wallet_output_payacc': '收款账户管理',
        'wallet_output_acctype': '账号类型',
        'wallet_output_truename': '真实姓名',
        'wallet_output_acc': '账号',
        'wallet_output_generalusers': '用于普通用户提出',
        'wallet_output_acceptance': '用于承兑收款',
        'wallet_output_seller': '用于场外交易卖家收款',
        'wallet_output_address': '常用转账地址',
        'wallet_output_walletaddress': '资产地址',
        'wallet_output_name': '名称',
        'wallet_output_othername': '别名',
        'wallet_output_note': '备注',
        'wallet_output_idcard': '身份证号',
        'wallet_output_phone': '手机号码',
        'wallet_output_code': '获取验证码',
        'wallet_output_vcode': '验证码',
        'wallet_output_seconds': '59秒后重新获取',
        'wallet_output_currency': '币种名称',
        'wallet_output_accde': '账户明细',
        'wallet_output_mortgage': '抵押',
        'wallet_output_assetdetails': '资产详情',
        'wallet_output_assetname': '资产名称',
        'wallet_output_issuer': '发行人',
        'wallet_output_digits': '小数位数',
        'wallet_output_supply': '当前供应量',
        'wallet_output_private': '隐私供应量',
        'wallet_output_commission': '市场手续费',
        'wallet_output_cap': '市场手续费上限',
        'wallet_output_pool': '手续费资金池',
        'wallet_output_rate': '手续费汇率',
        'wallet_output_balance': '资金池余额',
        'wallet_output_income': '发行人未申请收入',
        'wallet_output_permissions': '权限',
        'wallet_output_largest': '最大供应',
        'wallet_output_cash': '兑现账号',
        'wallet_output_casham': '兑现金额',
        'wallet_output_cashra': '兑现税额',
        'wallet_output_cashall': '兑现总额',
        'wallet_output_way': '兑现方式',
        'wallet_output_time': '兑现人兑现时间',
        'wallet_output_successful': '确认成功',
        'wallet_output_failure': '确认失败',
        'wallet_output_rof': '是否正确',
        'wallet_output_qrcode': '生成转账二维码',
        'wallet_output_transtype': '转账类型',
        'wallet_output_transnum': '转账数量',
        'wallet_output_copy ': '复制收款地址',
        'wallet_output_select ': '选择资产类型',
        'wallet_output_borrowing ': '借入金额',
        'wallet_output_available ': '可用余额',
        'wallet_output_price ': '喂价',
        'wallet_output_strong ': '你的强平触发价',
        'wallet_output_ratio ': '保证金比例',
        'wallet_output_reset ': '重置',
        'wallet_output_adjust ': '调整头寸',
        'wallet_output_buy ': '买入',
        'wallet_output_sell ': '卖出',
        'wallet_output_deity ': '我的挂单',
        'wallet_output_buying ': '买入价格',
        'wallet_output_buynum ': '买入数量',
        'wallet_output_orderstatus ': '订单状态',
        'wallet_output_nottransfer ': '未转账',
        'wallet_output_transfered ': '已转账',
        /*TAB3*/
        'account_asset_name': '积分资产',
        'account_login': '登录',
        'account_register': '注册',

        'account_i_say': '我要说',
        'account_modify_password': '修改密码',
        'account_my_member': '我的队员',
        'account_my_chain': '通证算池',
        'account_man_per': '人',
        'account_base_chain': '算力基数',
        'account_my_recommend': '总推荐数',
        'account_my_cert': '实名认证',
        'account_i_share': '我的分享',
        'account_my_means': '个人资料',
        'account_wallet_auto_lock': '设置资产自动锁定时间',
        'account_news': '新闻',
        'account_questions': '常见问题解答',
        'account_about_us': '关于我们',
        'account_language': '语言',
        'account_setting': '设置',
        'account_logout': '退出登录',
        'account_transfer': '转账',
        'account_balance': '账户余额',

        'account_check_update': '检查更新',
        "drop-down_refresh": "下拉刷新",
        "data_update": "数据更新中",
        'account_today_chain': '今日增量',
        "account_performance": "我的业绩",
        "account_new_team": "新增队员管理",
        "account_total": "总人数",
        "account_person": "人",
        "account_totalperformance": "总业绩额",
        "account_totalchain": "总增量",
        /*input中的字*/
        'input_title': '标题',
        'input_type': '类型',
        'input_confirm':'确认',
        'input_transfer':'转账',
        'input_buy':'买进',
        'input_sell':'卖出',
        'input_confirm_transfer':'确认转账',
        'input_leave_words': '留言',
        'input_opinion_title': '请输入意见标题',
        'input_clinch_number': '成交笔数',
        'input_margin_ordering': '保证金排序',
        'input_service_sorting': '手续费排序',
        'input_single_quotas': '单笔限额排序',
        'input_clinch_amount': '成交总额',
        'input_average_rate': '平均响应速度',
        'input_please_comments': '请输入意见内容',
        'input_account_phone_email': '账号/手机号/邮箱',
        'input_old_password': '旧密码',
        'input_new_password': '新密码：大小写字母数字，最少12位',
        'input_new_password_chk': '新密码（确认）',
        'input_modification': '修改',
        'input_minutes': '分钟',
        'input_search': '搜索',
        'input_keywords': '关键字',
        'wallet_time': '设置资产自动锁定时间',
        'wallet_no_contact': '你没有可选择的常用联系人',

        'english': 'English',
        'chinese': '简体中文',
        'korean': '한국어',
        'tab_account_set_language': '设置语言',
        'account_for_us_official_website': '官方网站',
        'account_for_us_versions': '版本',
        'account_my_say_my_message': '我的留言',
        'account_my_say_issue_opinion': '发表意见',
        'notice': '注意',
        'account_my_changepass_notice_notice': '如果密码丢失将无法找回账号，为了您的资产安全，请用纸笔记录密码并保存好，以免密码丢失造成不必要的损失',
        'wallet_transfer_notice_notice3': '请输入对应单位的转币数量和转入账户的帐户名',
        'wallet_default': '默认承兑商',
        'wallet_favorite': '收藏承兑商',
        'wallet_upper_limit': '额度',
        'wallet_rate': '手续费',
        'wallet_escrow': '总额度',
        'wallet_lower_limit': '下线额度',
        'wallet_quantity': '转币数量',
        'wallet_escrow_balance': '平台保证金',
        'wallet_fee': '充入手续费',
        'wallet_minimum': '最小额度',
        'wallet_maximum': '最大额度',
        'wallet_recharge_code': '充入码',
        'wallet_recharge_amount': '充入金额',
        'wallet_phone_number': '联系电话',
        'wallet_case_sensitive': '区分大小写',
        'wallet_select_way': '提出方式',
        'wallet_wechat': '微信',
        'wallet_alipay': '支付宝',
        'wallet_bank_card': '银行卡',
        'wallet_withdrawal_amount': '提出金额',
        'wallet_withdrawal_account': '提出账户',
        'wallet_withdrawal_code': '提出码',
        'wallet_my_eth_name': '我的ETH账号（默认）',
        'wallet_please_confirm': '请务必确认以免出错',
        'wallet_the_current_assets': '当前转币资产为',
        'wallet_the_other_info': '交易信息',
        'wallet_the_other_account': '对方账号',
        'wallet_friend_accounts': '常用联系人',
        'wallet_transfer_password': '交易密码',
        'wallet_select': '选择',
        'wallet_borrow': '借入',
        'wallet_asset': '资产',
        'wallet_open_orders': '挂单',
        'wallet_available': '可用',
        'wallet_account': '账户',
        'wallet_debt': '负债',
        'wallet_settlement': '清算',
        'wallet_total_assets': '总资产',
        'wallet_exchange': '交易',
        'wallet_base_menber': '普通会员',
        'wallet_buy_lifetime_subscription': '升级终身会员',
        'wallet_get_fees': '即刻享受80%的手续费返还奖励',
        'wallet_fee_allocation': '手续费分配',
        'wallet_network': '网络收取',
        'wallet_lifetime_referrer': '终身会员推荐人',
        'wallet_registrar': '注册人',
        'wallet_affiliate_referrer': '推荐人（码）',
        'wallet_fee_statistics': '手续费分配及现金返还',
        'wallet_total_fees_paid': '手续费总支出',
        'wallet_pending_fees': '待结费用',
        'wallet_binding_eth_address': '以太坊地址',
        'wallet_binding_eth_address_pair': '对应地址',
        'wallet_binding_eth_priv_tag': '账户私钥',
        'wallet_binding_eth_priv_tag_old': '账户私钥(旧)',
        'wallet_binding_eth_priv': '导入标准账户JSON文件内容',
        'wallet_binding_tagname': '标记名',
        'wallet_binding_mobile': '手机号',
        'wallet_binding_email': '邮箱',
        'wallet_add_bind': '添加ETH绑定',
        'wallet_please_input': '请输入',
        'wallet_binding_sure': '确定绑定',
        'wallet_transfer_address': '转账到此账户，地址栏请填写',
        'wallet_checkacc': '若条件允许，请核对账户',
        'wallet_optional': '选填,可由转账者决定数量',
        'wallet_my_get_money_message': '请输入写给转账者的消息(选填)',
        'wallet_collateral': '抵押是高风险操作，当市场价格到达您的强平价格时，您抵押的资产将会低于市场价格强制卖出，给您带来巨大损失，请谨慎操作',
        'wallet_gateway': '网关手续费',
        'wallet_dredge': '开通',
        'wallet_proposer_name': '申请人姓名',
        'wallet_real_name': '实名认证信息',
        'wallet_submit_audit': '下一步',

        'ext_chain_name': '链',
        'ext_mycert_chain': '链条',
        'ext_mycert_sure': '确认认证',
        'ext_mycert_notice0': '只有完成实名认证才能进入通证算池，',
        'ext_mycert_notice1': '认证之后不可更改，请认真填写。',
        'ext_mycert_notice2': '你已经完成实名认证，信息不能修改。',
        'ext_myassign_position': '可分派位置',
        'ext_sort_to': '分派到',
        'ext_sort_chain': '链条之下',

        //binding
        'wallet_eth_update': '更新时间',
        'wallet_btn_bind_update': '更新余额',
        'wallet_btn_bind_address': '绑定账户',
        'wallet_btn_bind_edit': '编辑',
        'wallet_btn_bind_del': '删除',
        'wallet_btn_bind_set_default': '设为默认',
        'wallet_btn_bind_export': '账户导出',
        'wallet_btn_bind_create': '新创建ETH账户',
        'wallet_btn_bind_save': '保存',
        'wallet_btn_bind_character': '字符串密码',
        'wallet_btn_bind_pass': '输入字符串作为密码',
        'wallet_binding_priv_title': '导入标准ETH账户',
        'wallet_btn_priv_export_img': '导出标准账户(二维码格式)',
        'wallet_btn_priv_export_txt': '导出标准账户(文本文件)',
    },
    'en': {
        'COIN': 'SECF',
        'COIN_NAME': 'Jade Coin',
        'COIN2': 'SECF',
        'COIN2_NAME': 'Jade Coin',
        'JIFEN': 'SECF Coupon',
        'JIFEN_TO': 'JiFen To SECF',
        'JIFEN_ASSET': 'SECP Value',
        'JIFEN_ASSET_CAN': 'Activated SECP Value',
        'JIFEN_PRICE': 'SECF Price',
        'account_jifen_list': 'Coupon List',

        'sys_ok': 'OK',
        'sys_cancel': 'CANCEL',
        'sys_ann': 'Notice',
        'value_null': '(None)',
        'input_about': 'About',
        'input_optional': '(Optional)',
        'input_please': 'Please input',
        'input_eg': 'eg: ',
        'supply_quantity':'Supply quantity',
        'exchange_num':'Quantity of exchange',

        'tab0': 'Home',
        'tab1': 'Market',
        'tab2': 'Wallet',
        'tab3': 'My',
        /*TAB1*/
        'podium_title': 'Coin Market',
        'podium_asset_default': 'Default Assets',
        'podium_asset_custom': 'Custom Assets',
        'podium_trade_max': 'Max',
        'podium_trade_min': 'Min',
        'podium_trade_amount': 'Amount',
        "no_content": "No content",
        "current": "The Current",
        /*TAB2*/
        'wallet_input': 'Coin In',
        'wallet_output': 'Coin Out',
        'wallet_transfer': 'Transfer',
        'wallet_message': 'Message',

        'wallet_info_my_asset': 'My Asset',
        'wallet_info_account': 'Account Info',
        'wallet_binding_info_title': 'My ETH address management',
        'wallet_info_vip': 'Normal',
        'wallet_info_detail': 'Detail',
        'wallet_self': 'Base Coin',

        'wallet_core': 'Wallet',
        'wallet_input_record': 'Coin In Record',
        'wallet_output_record': 'Coin Out Record',
        'wallet_trade_history': 'Trade History',
        'wallet_face_input': 'Face To Face',

        'wallet_tools': 'Tools',
        'wallet_pay_account': 'Pay Accounts',
        'wallet_normal_address': 'Normal Address',
        'wallet_base_info': 'Base Account Info',
        'wallet_query_account': 'Account Query',
        'wallet_query_asset': 'Asset Query',
        'wallet_query_currencies': 'Currencies Query',
        'wallet_query_seletail': 'For Details',
        'wallet_query_cod': 'Coin Out Details',
        'wallet_query_Collect': 'Collect Coins',

        'wallet_honour': 'honour',
        'wallet_honour_apply': 'Apply',
        'wallet_honour_manage': 'Manage',
        'wallet_honour_rate': 'Rate',
        'wallet_honour_ratio': 'Exchange rate',
        'wallet_honour_online': 'Each exchange uppper limit',
        'wallet_honour_offline': 'Each exchange lower limit',
        'wallet_money_account': 'Receivable account',
        "my_wallet_input": "My Coin In",
        "wallet_input_in": "Coining In",
        "wallet_dealing": "Dealing",
        "wallet_input_history": "Coining In History",
        "wallet_input_transfer": "To Transfer",
        'wallet_output_my': 'My Coin Out',
        'wallet_output_doing': 'Coining Out',
        'wallet_output_refund': 'refunding',
        'wallet_output_history': 'Coining Out History',
        'wallet_output_done': 'Completed',
        'wallet_output_checkhis': "Historical Record Selection",
        'wallet_output_allhis': 'All History',
        'wallet_output_ok': 'OK',
        'wallet_output_cancel': 'Cancel',
        'wallet_output_transfer': 'Transfer',
        'wallet_output_Limit': 'Limit Orders',
        'wallet_output_orderset': 'The Order Set',
        'wallet_output_payacc': 'Payment Account Management',
        'wallet_output_acctype': 'Account Type',
        'wallet_output_truename': 'True Name',
        'wallet_output_acc': 'Account',
        'wallet_output_generalusers': 'Used For General Users',
        'wallet_output_acceptance': 'Used For Acceptance',
        'wallet_output_seller': 'Used For Over-the-counter Seller',
        'wallet_output_address': 'Common Transfer Address',
        'wallet_output_walletaddress': 'The Wallet Address',
        'wallet_output_name': 'Name',
        'wallet_output_othername': 'Alias',
        'wallet_output_note': 'Note',
        'wallet_output_idcard': 'Id Number',
        'wallet_output_phone': 'Mobile Phone Number',
        'wallet_output_code': 'Get Verification Code',
        'wallet_output_vcode': 'Verification Code',
        'wallet_output_seconds': 'Reacquire After 59 Seconds',
        'wallet_output_currency': 'The Name of The Currency',
        'wallet_query_selectdetail': 'Account Details',
        'wallet_output_accde': 'Account Details',
        'wallet_output_mortgage': 'Mortgage',
        'wallet_output_assetdetails': 'Asset Details',
        'wallet_output_assetname': 'Assetname',
        'wallet_output_issuer': 'The Issuer',
        'wallet_output_digits': 'Decimal Digits',
        'wallet_output_supply': 'Current Supply',
        'wallet_output_private': 'Private supply',
        'wallet_output_commission': 'Market commission',
        'wallet_output_cap': 'Market Cap',
        'wallet_output_pool': 'Service Fee Pool',
        'wallet_output_rate': 'Commission Rate',
        'wallet_output_balance': 'Fund Pool Balance',
        'wallet_output_income': 'The Issuer Does Not Apply for Income',
        'wallet_output_permissions': 'Permissions',
        'wallet_output_largest': 'The Largest Supply',
        'wallet_output_cash': 'Cash Account',
        'wallet_output_casham': 'Cash Amount',
        'wallet_output_cashra': 'Cash Rate',
        'wallet_output_cashall': 'The Total Amount of Cash',
        'wallet_output_way': 'Cash Way',
        'wallet_output_time': 'Cash Time',
        'wallet_output_successful': 'Identify Successful',
        'wallet_output_failure': 'Identify Failure',
        'wallet_output_rof': 'Whether It is Right',
        'wallet_output_qrcode': 'Generate transfer qr code',
        'wallet_output_transtype': 'Transfer Type',
        'wallet_output_transnum': 'Transfer Number',
        'wallet_output_copy ': 'Copy the Collection Address',
        'wallet_output_select ': 'Select Asset Type',
        'wallet_output_borrowing ': 'Borrowing Amount',
        'wallet_output_available ': 'Available balance',
        'wallet_output_price ': 'Price',
        'wallet_output_strong ': 'Your Strong Flat Trigger Price',
        'wallet_output_ratio ': 'Margin Ratio',
        'wallet_output_reset ': 'Reset ',
        'wallet_output_adjust ': 'Adjust the Position',
        'wallet_output_buy ': 'Buy',
        'wallet_output_sell ': 'Sell',
        'wallet_output_deity ': 'My Deity',
        'wallet_output_buying ': 'Buying Price',
        'wallet_output_buynum ': 'Buying Number',
        'wallet_output_orderstatus ': 'The Order Status',
        'wallet_output_nottransfer ': 'Not Transfer',
        'wallet_output_transfered ': 'Transferred',
        /*TAB3*/
        'account_asset_name': 'Coupon Assets',
        'account_login': 'Login',
        'account_register': 'Register',

        'account_i_say': 'I Say',
        'account_modify_password': 'Modify Password',
        'account_my_member': 'My Member',
        'account_my_chain': 'My Chain',
        'account_man_per': 'Man',
        'account_base_chain': 'Base',
        'account_my_recommend': 'My Recommend',
        'account_my_cert': 'Certification',
        'account_i_share': 'I Share',
        'account_my_means': 'My Profile',
        'account_wallet_auto_lock': 'Auto Lock Wallet',
        'account_news': 'News',
        'account_questions': 'Question/Answer',
        'account_about_us': 'About Us',
        'account_language': 'Language',
        'account_setting': 'Settings',
        'account_logout': 'Logout',
        'account_transfer': 'Transfer',
        'account_balance': 'Balance',

        'account_check_update': 'Check Update',
        "drop-down_refresh": "Drop-down Rrefresh",
        "data_update": "In Data Update",
        'account_today_chain': 'Today Chain',
        "account_performance": "My Performance",
        "account_new_team": "New Team Management",
        "account_total": "Total Number",
        "account_person": "person",
        "account_totalperformance": "Total Performance",
        "account_totalchain": "Total Chain",
        /*input中的字*/
        'input_title': 'Title',
        'input_type': 'Type',
        'input_leave_words': 'leave words',
        'input_confirm':'confirm',
        'input_transfer':'transfer',
        'input_confirm_transfer':'Confirm transfer',
        'input_buy':'Buy in',
        'input_sell':'Sell out',
        'input_opinion_title': 'Please input the opinion title',
        'input_clinch_number': 'Quantity',
        'input_margin_ordering': 'Cash amount',
        'input_service_sorting': 'Rate',
        'input_single_quotas': 'Single limit',
        'input_clinch_amount': 'Total amount',
        'input_average_rate': 'Average speed',
        'input_please_comments': 'Content',
        'input_account_phone_email': 'account number/cell-phone number/Email',
        'input_old_password': 'Old Password',
        'input_new_password': 'New password:Upper and lower case alphanumeric,At least 12',
        'input_new_password_chk': 'New password(Verify)',
        'input_modification': 'modification',
        'input_minutes': 'Minutes',
        'input_search': 'Search',
        'input_keywords': 'Keywords',
        'wallet_time': 'Wallet Auto-lock Timer',
        'wallet_no_contact': 'No Contacts',

        'english': 'English',
        'chinese': '简体中文',
        'korean': '한국어',
        'tab_account_set_language': 'set the language',
        'account_for_us_official_website': 'Official website',
        'account_for_us_versions': 'Version',
        'account_my_say_my_message': 'My Opinions',
        'account_my_say_issue_opinion': 'issue opinion',
        'notice': 'Notice',
        'account_my_changepass_notice_notice': 'Your Account can not be retrieved if you lost your password,For your assets safety. Please write down your password on a paper and keep it,To Avoid the loss',
        'wallet_transfer_notice_notice3': 'Please carefully input the correct account name',
        'wallet_transfer_notice_notice4': 'Please be sure to double-check all infomation',
        'wallet_default': 'Default',
        'wallet_favorite': 'Favorite',
        'wallet_upper_limit': 'Upper limit',
        'wallet_rate': 'Rate',
        'wallet_escrow': 'Total amount',
        'wallet_lower_limit': 'Lower Limit',
        'wallet_quantity': 'Quantity',
        'wallet_escrow_balance': 'Escrow balance',
        'wallet_fee': 'Fee',
        'wallet_minimum': 'Minimum',
        'wallet_maximum': 'Maximum',
        'wallet_recharge_code': 'Recharge Code',
        'wallet_recharge_amount': 'Recharge Amount',
        'wallet_phone_number': 'Phone Number',
        'wallet_case_sensitive': 'Case Sensitive',
        'wallet_select_way': 'Select Way',
        'wallet_wechat': 'Wechat',
        'wallet_alipay': 'Alipay',
        'wallet_bank_card': 'Bank Card',
        'wallet_withdrawal_amount': 'Withdrawal Amount',
        'wallet_withdrawal_account': 'Withdrawal Account',
        'wallet_withdrawal_code': 'Withdrawal Code',
        'wallet_my_eth_name': 'My ETH Account(Default)',
        'wallet_please_confirm': 'Please Confirm',
        'wallet_the_current_assets': 'The current assets',
        'wallet_the_other_info': 'Transfer Info',
        'wallet_the_other_account': 'The other accounts',
        'wallet_friend_accounts': 'Friend Accounts',
        'wallet_transfer_password': 'Transfer Password',
        'wallet_select': 'Select',
        'wallet_borrow': 'Borrow',
        'wallet_asset': 'Asset',
        'wallet_open_orders': 'Open Orders',
        'wallet_available': 'Available',
        'wallet_account': 'Account',
        'wallet_debt': 'Debt',
        'wallet_settlement': 'Settlement',
        'wallet_total_assets': 'Total Assets',
        'wallet_exchange': 'Exchange',
        'wallet_base_menber': 'Base Menber',
        'wallet_buy_lifetime_subscription': 'Buy lifetime subscription',
        'wallet_get_fees': 'Get 80% cashback on fees',
        'wallet_fee_allocation': 'Fee Allocation',
        'wallet_network': 'Network',
        'wallet_lifetime_referrer': 'Lifetime Referrer',
        'wallet_registrar': 'Registrar',
        'wallet_affiliate_referrer': 'Affiliate Referrer(Code)',
        'wallet_fee_statistics': 'Fee statistics',
        'wallet_total_fees_paid': 'Total fees paid',
        'wallet_pending_fees': 'Pending fees',
        'wallet_binding_eth_address': 'ETH Address',
        'wallet_binding_eth_address_pair': 'For Address',
        'wallet_binding_eth_priv_tag': 'Account Private Info',
        'wallet_binding_eth_priv_tag_old': 'Account Private Info(Old)',
        'wallet_binding_eth_priv': 'ETH Standard Wallet JSON(Optional)',
        'wallet_binding_tagname': 'Tag Name',
        'wallet_binding_mobile': 'Mobile',
        'wallet_binding_email': 'Email',
        'wallet_add_bind': 'ETH Add Bind',
        'wallet_please_input': 'Please Input ',
        'wallet_binding_sure': 'Sure Bind',
        'wallet_transfer_address': 'Transfer to this account, please fill in the address bar',
        'wallet_checkacc': 'Please check the account if conditions permit',
        'wallet_optional': 'Optional, the amount can be determined by the transferor',
        "wallet_my_get_money_message": 'Please input the message to the remitter (optional)',
        'wallet_collateral': 'Collateral is a high-risk operation. When the market price reaches your strong flat price, your mortgaged assets will be sold at a lower price than the market price, which will cause you great loss. Please proceed with caution.',
        'wallet_gateway': 'Gateway Charge',
        'wallet_dredge': 'Dredge',
        'wallet_proposer_name': 'Proposer Name',
        'wallet_real_name': 'Real-name authentication information',
        'wallet_submit_audit': 'Next Step',

        'ext_chain_name': 'Chain',
        'ext_mycert_chain': 'Chain Area',
        'ext_mycert_sure': 'sure',
        'ext_mycert_notice0': 'Only by completing the real-name authentication can you enter the link calculation force,',
        'ext_mycert_notice1': 'After authentication, please fill in carefully.',
        'ext_mycert_notice2': 'Your authentication can\'t modify',
        'ext_myassign_position': 'Dispatch position',
        'ext_sort_to': 'Sort To',
        'ext_sort_chain': 'Chain Area',

        //binding
        'wallet_eth_update': 'Update Time',
        'wallet_btn_bind_update': 'Update Balance',
        'wallet_btn_bind_address': 'Bind Account',
        'wallet_btn_bind_edit': 'Edit',
        'wallet_btn_bind_del': 'Delete',
        'wallet_btn_bind_set_default': 'Selected',
        'wallet_btn_bind_export': 'Account export',
        'wallet_btn_bind_create': 'Create New ETH Account',
        'wallet_btn_bind_save': 'Save',
        'wallet_btn_bind_character': 'String password',
        'wallet_btn_bind_pass': 'Enter a string as a password',
        'wallet_binding_priv_title': 'Binding ETH standard account',
        'wallet_btn_priv_export_img': 'Export Wallet Account (Image File)',
        'wallet_btn_priv_export_txt': 'Export Wallet Account (Text File)',
    },
    'kr': {
        'COIN': 'SECF',
        'COIN_NAME': '자산코인',
        'COIN2': 'SECF',
        'COIN2_NAME': '자산코인',
        'JIFEN': '자산증권',
        'JIFEN_TO': '자산증권으로 자산코인을 환전',
        'JIFEN_ASSET': 'SECP값.',
        'JIFEN_ASSET_CAN': '활성화SECP값.',
        'JIFEN_PRICE': '가치.',
        'account_jifen_list': '자산증권재무',

        'sys_ok': '확인',
        'sys_cancel': '취소',
        'sys_ann': '공고',
        'value_null': '(없음)',
        'input_about': '비고',
        'input_optional': '(선택가능)',
        'input_please': '입력하십시오',
        'input_eg': '예컨대: ',
        'supply_quantity':'提供数量',
        'exchange_num':'兑换数量',

        'tab0': '페이지',
        'tab1': '시세',
        'tab2': '지갑',
        'tab3': '나의',
        /*TAB1*/
        'podium_title': '코인시세',
        'podium_asset_default': '묵인자산',
        'podium_asset_custom': '자체 정의 자산',
        'podium_trade_max': '최고',
        'podium_trade_min': '최저',
        'podium_trade_amount': '수량',
        "no_content": "내용 없음",
        'current': '현재',
        /*TAB2*/
        'wallet_input': '충입',
        'wallet_output': '인출',
        'wallet_transfer': '화폐 전환',
        'wallet_message': '메시지',

        'wallet_info_my_asset': '나의 자산',
        'wallet_info_account': '통장정보',
        'wallet_binding_info_title': '나의 ETH주소관리',
        'wallet_info_vip': '보통회원',
        'wallet_info_detail': '상세 정보',
        'wallet_self': '본위화폐',

        'wallet_core': '지갑',
        'wallet_input_record': '충입기록',
        'wallet_output_record': '인출 기록',
        'wallet_trade_history': '교역 역사',
        'wallet_face_input': '당장 화폐 교역',

        'wallet_tools': '도구',
        'wallet_pay_account': '지불통장',
        'wallet_normal_address': '상용주소',
        'wallet_base_info': '기본 정보',
        'wallet_query_account': '통장번호 조회',
        'wallet_query_asset': '자산 조회',
        'wallet_query_currencies': '화폐종류 조회',
        'wallet_query_selectdetail': '통장번호 조회 상세정보',
        'wallet_query_seletail': '조회 상세정보',
        'wallet_query_cod': '인출 상세정보',
        'wallet_query_Collect': '화폐 수입',

        'wallet_honour': '인수인',
        'wallet_honour_apply': '가입 신청',
        'wallet_honour_manage': '인수 관리',
        'wallet_honour_rate': '요금률',
        'wallet_honour_ratio': '兑换比率',
        'wallet_honour_online': '한정(가장 크다)',
        'wallet_honour_offline': '한정(최소)',
        'wallet_money_account': '수금 계좌',
        'my_wallet_input': '나의 충전',
        'wallet_input_in': '충전중',
        'wallet_dealing': '처리중',
        'wallet_input_history': '충전역사',
        'wallet_input_transfer': '대체 기다림',
        'wallet_output_my': '나의 인출',
        'wallet_output_doing': '인출중',
        'wallet_output_refund': '환급중',
        'wallet_output_history': '인출역사',
        'wallet_output_done': '완성됨',
        'wallet_output_checkhis': '역사기록 선택',
        'wallet_output_allhis': '전부역사',
        'wallet_output_ok': '확인',
        'wallet_output_cancel': '취소',
        'wallet_output_transfer': '대체하다',
        'wallet_output_Limit': '가격 제한표',
        'wallet_output_orderset': '오더 맺음',
        'wallet_output_payacc': '지불통장 관리',
        'wallet_output_acctype': '통장 유형',
        'wallet_output_truename': '본명',
        'wallet_output_acc': '통장번호',
        'wallet_output_generalusers': '보통 사용자 인출에 사용',
        'wallet_output_acceptance': '인수인 대금수납에 사용',
        'wallet_output_seller': '시장외 교역의 판매자 대금수납에 사용',
        'wallet_output_address': '상용 대체 주소',
        'wallet_output_walletaddress': '지갑주소',
        'wallet_output_name': '이름',
        'wallet_output_othername': '별명',
        'wallet_output_note': '비고',
        'wallet_output_idcard': '주민등록증 법호',
        'wallet_output_phone': '휴대폰 번호',
        'wallet_output_code': '인증번호 획득',
        'wallet_output_vcode': '인증번호',
        'wallet_output_seconds': '59초후 다시 획득',
        'wallet_output_currency': '코인종류',
        'wallet_output_accde': '통장 상세 정보',
        'wallet_output_mortgage': '저당',
        'wallet_output_assetdetails': '자산 상세 정보',
        'wallet_output_assetname': '자산 이름',
        'wallet_output_issuer': '발행인',
        'wallet_output_digits': '소수위수',
        'wallet_output_supply': '현제 공급량',
        'wallet_output_private': '비밀 공급량',
        'wallet_output_commission': '시장수속료',
        'wallet_output_cap': '시장수속료 상한',
        'wallet_output_pool': '수속료 자금지',
        'wallet_output_rate': '수속료환율',
        'wallet_output_balance': '자금지 잔고',
        'wallet_output_income': '발행인 미신청 수입',
        'wallet_output_permissions': '권한',
        'wallet_output_largest': '최대공급',
        'wallet_output_cash': '도래 통장번호',
        'wallet_output_casham': '도래 금액',
        'wallet_output_cashra': '도래 세금액',
        'wallet_output_cashall': '도래 총액',
        'wallet_output_way': '도래 방식',
        'wallet_output_time': '도래인 도래시간',
        'wallet_output_successful': '확인 성공',
        'wallet_output_failure': '확인 실패',
        'wallet_output_rof': '정확합니까',
        'wallet_output_qrcode': '대체 QR코드 생성',
        'wallet_output_transtype': '대체 유형',
        'wallet_output_transnum': '대체수량',
        'wallet_output_copy ': '대금수납 주소를 복사',
        'wallet_output_select ': '자산 유형을 선택',
        'wallet_output_borrowing ': '대부금액',
        'wallet_output_available ': '사용가능 잔고',
        'wallet_output_price ': '가격',
        'wallet_output_strong ': '당신의 강제 청산 유발 가격',
        'wallet_output_ratio ': '보증금 비례',
        'wallet_output_reset ': '초기화',
        'wallet_output_adjust ': '포지션 조절',
        'wallet_output_buy ': '매입',
        'wallet_output_sell ': '매출',
        'wallet_output_deity ': '나의 전표',
        'wallet_output_buying ': '매입가격',
        'wallet_output_buynum ': '매입수량',
        'wallet_output_orderstatus ': '주문서 상황',
        'wallet_output_nottransfer ': '미대체',
        'wallet_output_transfered ': '대체완성',
        /*TAB3*/
        'account_asset_name': '포인트 자산',
        'account_login': '로그인',
        'account_register': '신규등록',

        'account_i_say': '하고 싶은 말',
        'account_modify_password': '비밀번호 수정',
        'account_my_member': '나의 팀원',
        'account_my_chain': '체인',
        'account_man_per': '인',
        'account_base_chain': '체인 베이스',
        'account_my_recommend': '총추천수',
        'account_my_cert': '실명인증',
        'account_i_share': '나의 세어링',
        'account_my_means': '개인자료',
        'account_wallet_auto_lock': '지갑 자동 잠금시간 설치',
        'account_news': '뉴스',
        'account_questions': '흔한 문제에 대한 해답',
        'account_about_us': '우리에 관해서',
        'account_language': '언어',
        'account_setting': '설치',
        'account_logout': '로그아웃',
        'account_transfer': '이체',
        'account_balance': '계정 잔액',

        'account_check_update': '업데이트를 검사',
        'drop-down_refresh': '갱신',
        'data_update': '데이터 업데이트 중',
        'account_today_chain': '오늘의 증가량',
        'account_performance': '나의 업적',
        'account_new_team': '새로운 팀원의 관리',
        'account_total': '총인수',
        'account_person': '인',
        'account_totalperformance': '총 업적 ',
        'account_totalchain': '총 증가량',
        /*input中的字*/
        'input_title': '제목',
        'input_type': '유형',
        'input_confirm':'确认',
        'input_transfer':'转账',
        'input_buy':'买进',
        'input_sell':'卖出',
        'input_confirm_transfer':'确认转账',
        'input_leave_words': '메시지',
        'input_opinion_title': '의견 제목을 입력하세요',
        'input_clinch_number': '거래 성립 수량',
        'input_margin_ordering': '보증금순서',
        'input_service_sorting': '수속료순서',
        'input_single_quotas': '일방거래 제한액 순서',
        'input_clinch_amount': '거래 총액',
        'input_average_rate': '평균 응답속도',
        'input_please_comments': '의견 내용을 입력하세요',
        'input_account_phone_email': '통장번호/전화번호/이메일',
        'input_old_password': '구 비밀번호',
        'input_new_password': '새로운 비밀번호:대문자,소문자,수자,최소12위',
        'input_new_password_chk': '새로운 비밀번호(확인)',
        'input_modification': '수정',
        'input_minutes': '분',
        'input_search': '수색',
        'input_keywords': '키워드',
        'wallet_time': '지갑 자동 잠금시간 설치',
        'wallet_no_contact': '선택할수 있는 상용연락인이 없습니다.',

        'english': 'English',
        'chinese': '简体中文',
        'korean': '한국어',
        'tab_account_set_language': '언어 설치',
        'account_for_us_official_website': '공식 사이트',
        'account_for_us_versions': '버전',
        'account_my_say_my_message': '나의 댓글',
        'account_my_say_issue_opinion': '의견발표',
        'notice': '주의',
        'account_my_changepass_notice_notice': '비밀번호가 잃어버리면 통장번호를 다시 찾을수 없으니 불필요한 손실을 일으키지 않고 자산안전을 위해서 비밀번호를 기록하여 보존하시길 바랍니다.',
        'wallet_transfer_notice_notice3': '상응단위의 화폐전이 수량과 수납통장의 통장이름을 입력하세요.',
        'wallet_default': '묵인한 인수인',
        'wallet_favorite': '수장된 인수인',
        'wallet_upper_limit': '개봉금액',
        'wallet_rate': '수속료',
        'wallet_escrow': '총액도',
        'wallet_lower_limit': '오프라인 금액',
        'wallet_quantity': '화페전환 수량',
        'wallet_escrow_balance': '플랫폼 보증금',
        'wallet_fee': '수속료 충전',
        'wallet_minimum': '최소금액',
        'wallet_maximum': '최대금액',
        'wallet_recharge_code': '충전코드',
        'wallet_recharge_amount': '충전금액',
        'wallet_phone_number': '연락번호',
        'wallet_case_sensitive': '대문자,소문자를 구분합니다',
        'wallet_select_way': '인출방식',
        'wallet_wechat': '위챗',
        'wallet_alipay': '알리페이',
        'wallet_bank_card': '은행카드',
        'wallet_withdrawal_amount': '인출금액',
        'wallet_withdrawal_account': '인출통장',
        'wallet_withdrawal_code': '인출코드',
        'wallet_my_eth_name': '나의 ETH 통장번호(묵인)',
        'wallet_please_confirm': '틀림이 없음을 확인하세요',
        'wallet_the_current_assets': '현재 화폐전환자산은',
        'wallet_the_other_info': '교역정보',
        'wallet_the_other_account': '상대방 통장번호',
        'wallet_friend_accounts': '상용 연락인',
        'wallet_transfer_password': '교역 비밀번호',
        'wallet_select': '선택',
        'wallet_borrow': '차입',
        'wallet_asset': '자산',
        'wallet_open_orders': '전표',
        'wallet_available': '사용가능',
        'wallet_account': '통장',
        'wallet_debt': '부채',
        'wallet_settlement': '청산',
        'wallet_total_assets': '총자산',
        'wallet_exchange': '교역',
        'wallet_base_menber': '보통회원',
        'wallet_buy_lifetime_subscription': '종신 회원으로 업그레이드합니다',
        'wallet_get_fees': '바로 80%의 수속료 반납장려를 받을수 있습니다',
        'wallet_fee_allocation': '수속료 분배',
        'wallet_network': '인터넷 수납',
        'wallet_lifetime_referrer': '종신 회원 추천인',
        'wallet_registrar': '등록인',
        'wallet_affiliate_referrer': '추천인(코드)',
        'wallet_fee_statistics': '수속료분배 및 현금반납',
        'wallet_total_fees_paid': '수속료 총지출',
        'wallet_pending_fees': '결산 대기중인 비용',
        'wallet_binding_eth_address': '바인딩주소',
        'wallet_binding_eth_address_pair': '상응주소',
        'wallet_binding_eth_priv_tag': '통장 비밀키',
        'wallet_binding_eth_priv_tag_old': '통장 비밀키(구)',
        'wallet_binding_eth_priv': 'ETH통장의 JSON문건내용을 도입(선택가능)',
        'wallet_binding_tagname': '표기명',
        'wallet_binding_mobile': '전화번호',
        'wallet_binding_email': '이메일',
        'wallet_add_bind': 'ETH바인딩을 추가',
        'wallet_please_input': '입력하세요',
        'wallet_binding_sure': '바인딩 확인합니다 ',
        'wallet_transfer_address': '이 통장에 대체함,주소창에 입력하세요.',
        'wallet_checkacc': '조건이 허용할 경우 통장을 체크하세요.',
        'wallet_optional': '선택사항입니다,대체인이 수량을 결정할수 있다.',
        'wallet_my_get_money_message': '대체인에게 주는 메세지를 입력하시오.(선택사항)',
        'wallet_collateral': '저당은 위험성이 크므로 시장가격이 당신의 강제 청산가격에 도달했을 경우 당신이 저당한 자산은 시장가격보다 싸게 강제매출될수 있어 큰 손해를 받을수 있으니 신중하십시오.',
        'wallet_gateway': '게이트웨이 수속료',
        'wallet_dredge': '개통',
        'wallet_proposer_name': '신청인 이름',
        'wallet_real_name': '실명인증 정보',
        'wallet_submit_audit': '다음 걸음',

        'ext_chain_name': '체인',
        'ext_mycert_chain': '체인',
        'ext_mycert_sure': '인증확인',
        'ext_mycert_notice0': '실명인증을 마쳐야만 체인에 들어갈수 있습니다.',
        'ext_mycert_notice1': '인증후 변경할수 없으니 착실히 기입하십시오.',
        'ext_mycert_notice2': '실명인증을 마쳤음으로 정보를 수정할수 없습니다.',
        'ext_myassign_position': '분배할수 있는 위치',

        'ext_sort_chain': '체인 밑',

        //binding
        'wallet_eth_update': '갱신 시간',
        'wallet_btn_bind_update': '잔고 갱신',
        'wallet_btn_bind_address': '통장 바인딩',
        'wallet_btn_bind_edit': '편집',
        'wallet_btn_bind_del': '삭제',
        'wallet_btn_bind_set_default': '묵인으로 설정',
        'wallet_btn_bind_export': '통장 도출',
        'wallet_btn_bind_create': 'ETH통장을 작성',
        'wallet_btn_bind_save': '보존',
        'wallet_btn_bind_character': '문자열 비밀번호',
        'wallet_btn_bind_pass': '문자열을 입력하여 비밀번호로 한다',
        'wallet_binding_priv_title': '표준 ETH통장도입',
        'wallet_btn_priv_export_img': '표준통장 도출(QR코드 격식)',
        'wallet_btn_priv_export_txt': '표준통장 도출(텍스트 문건)',
    },
};

export class PageBase {
    //cfg_app = 'SPC';
    cfg_app = 'SECF';
    cfg_website = '';
    cfg_wallet_open = false;
    cfg_priv_export = false;
    cfg_no_honour = false;
    cfg_have_io = true;

    sess = null;
    isLogin = false;

    LANGS(lang_name) {
        var lng = AppConfig.getLang();
        if (typeof (langs[lng]) == 'undefined') {
            lng = 'en';
        }
        if (typeof (langs[lng][lang_name]) == 'undefined') {
            return '-';
        }
        return langs[lng][lang_name];
    }

    ionViewDidLoad() {
        AppConfig.insertObserver(this);
    }

    format_address(v) {
        if (AppUtil.isEmpty(v)) {
            return '';
        }
        v = '' + v;
        var reg = /^(\w{4})\w+(\w{4})$/;
        return v.replace(reg, "$1****$2");
    }

    sprintf(...args) {
        var fargs = [];
        for (var i in args) {
            if (typeof (args[i]) != 'undefined') {
                fargs.push(args[i]);
            }
        }
        if (fargs.length < 2) {
            return '-';
        }
        return sprintf(...fargs);
    }

    min(n, ...args) {
        var m = new BigNumber('0');
        if (args.length < 1) {
            return m.toFixed(n);
        }
        m = new BigNumber(args.shift());
        for (var i in args) {
            var t = new BigNumber(args[i]);
            if (m.isGreaterThan(t)) {
                console.log("m.isGreaterThan");
                m = t;
            }
        }
        return m.toFixed(n);
    }

    max(n, ...args) {
        var m = new BigNumber('0');
        if (args.length < 1) {
            return m.toFixed(n);
        }
        m = new BigNumber(args.shift());
        for (var i in args) {
            var t = new BigNumber(args[i]);
            if (m.isLessThan(t)) {
                console.log("m.isLessThan");
                m = t;
            }
        }
        return m.toFixed(n);
    }

    nan(v, def = 0.0) {
        if (typeof (v) == 'number') {
            return isNaN(v) ? def : v;
        }
        return v.isNaN() ? (new BigNumber(def)) : v;
    }

    numberFormat(v, n = 6) {
        if(!v) {
            return (new BigNumber(0)).toFormat(n);
        }
        return (new BigNumber(v)).toFormat(n);
    }

    maxFixed(v, n) {
        var vn = new BigNumber(v);
        if (vn.isNaN()) {
            return '0';
        }
        var f = vn.toFixed(n);
        if (f.length <= n || f[f.length - n - 1] != '.') {
            return '0';
        }
        for (var i = 0; i < n - 1; i++) {
            if (f[f.length - 1] == '0') {
                f = f.slice(0, f.length - 1);
            } else {
                break;
            }
        }
        return f;
    }

    compare(v1, v2) {
        return (new BigNumber(v1)).comparedTo(v2);
    }

    uidToOuid(uid, tag = 'SECP') {
        if (!uid) {
            return '';
        }
        return sprintf(tag + '%08d', uid);
    }

    numberFixed(v, n = 6) {
        return (new BigNumber(v)).toFixed(n);
    }

    percent(v) {
        var t = parseFloat(v) * 100.0;
        return isNaN(t) ? '0%' : (t.toFixed(1) + '%');
    }

    plus(n, ...args) {
        var m = new BigNumber('0');
        if (args.length < 1) {
            return m.toFixed(n);
        }
        m = new BigNumber(args.shift());
        for (var i in args) {
            if (args[i]) {
                m = m.plus(new BigNumber(args[i]));
            }
        }
        return m.toFixed(n);
    }

    user_name(s) {
        if (AppUtil.isEmpty(s)) {
            return '';
        }
        if (typeof (s['name']) != 'undefined' && s['name'].length > 0) {
            return s['name'];
        }
        if (typeof (s['nickname']) != 'undefined' && s['nickname'].length > 0) {
            return s['nickname'];
        }
        if (typeof (s['username']) != 'undefined' && s['username'].length > 0) {
            return s['username'];
        }
        if (typeof (s['umobile']) != 'undefined' && s['umobile'].length > 0) {
            return s['umobile'];
        }
        if (typeof (s['uemail']) != 'undefined' && s['uemail'].length > 0) {
            return s['uemail'];
        }
        if (typeof (s['uopenid']) != 'undefined' && s['uopenid'].length > 0) {
            return s['uemail'];
        }
        return '';
    }

    coin_tag(v) {
        if (v.toUpperCase() == 'SELF') {
            return this.LANGS('COIN');
        }
        return v;
    }

    coin_name(v) {
        if (v.toUpperCase() == 'SELF') {
            return 'SEC';
        }
        return v;
    }

    loadingCreate(loadingCtrl: LoadingController, content: string) {
        return loadingCtrl.create({
            content: content,
            spinner: 'circles',
        });
    }
}