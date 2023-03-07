"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
function fsub(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        var { channels, notJoinedMessage, enable_inline, parse_mode } = opts;
        if (!enable_inline)
            enable_inline = false;
        if (!channels)
            throw new Error("FsubErr: Parameter Check Channels Not Provided");
        if (!parse_mode)
            parse_mode = "Markdown";
        const middleware = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            if (!ctx.from)
                throw Error("FsubErr: ctx.from is undefined");
            for (var channel of channels) {
                var result = yield ctx.telegram.getChatMember(channel, ctx.from.id).catch((e) => {
                    throw new Error(`FsubError: Cannot Check For Chat 2${channel} | Error ~ ${e.message}`);
                });
                var { status } = result;
                if (!(status == "member" || status == "administrator" || status == "creator")) {
                    if (!notJoinedMessage) {
                        notJoinedMessage = "Hello {user}, You Must Join {channel}";
                    }
                    var replyStr = notJoinedMessage.replace("{user}", ctx.from.first_name);
                    var replyStr = notJoinedMessage.replace("{user_id}", ctx.from.id.toString());
                    var replyStr = notJoinedMessage.replace("{channel}", `@${channel}`);
                    if (enable_inline) {
                        telegraf_1.Markup.inlineKeyboard([
                            telegraf_1.Markup.button.url("Join Channel", `https://t.me/${channel}`)
                        ]);
                    }
                    ctx.reply(replyStr, { parse_mode });
                    return;
                }
                else {
                    continue;
                }
            }
            yield next();
        });
        return middleware;
    });
}
exports.default = fsub;
