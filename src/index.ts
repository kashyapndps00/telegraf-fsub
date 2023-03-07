import { Middleware, Context, Markup } from "telegraf"
export interface initial_options {
    channels: string[] | number[] | [],
    notJoinedMessage?: string | "Hello {user}, You Must Joined {channel}",
    enable_inline?: boolean,
    parse_mode?: "Markdown" | "HTML"
}
export default async function fsub(opts: initial_options): Promise<Middleware<Context>> {
    var { channels, notJoinedMessage, enable_inline, parse_mode } = opts;
    if (!enable_inline) enable_inline = false;
    if (!channels) throw new Error("FsubErr: Parameter Check Channels Not Provided");
    if (!parse_mode) parse_mode = "Markdown";

    const middleware = async (ctx: Context, next: () => Promise<void>) => {
        if (!ctx.from) throw Error("FsubErr: ctx.from is undefined");
        for (var channel of channels) {
            var result = await ctx.telegram.getChatMember(channel, ctx.from.id).catch((e:Error)=>{
                throw new Error(`FsubError: Cannot Check For Chat 2${channel} | Error ~ ${e.message}`)
            });
            var { status } = result;
            if (!(status == "member" || status == "administrator" || status == "creator")) {
                if (!notJoinedMessage) {
                    notJoinedMessage = "Hello {user}, You Must Join {channel}";
                }
                var replyStr = notJoinedMessage.replace("{user}", ctx.from.first_name);
                var replyStr = notJoinedMessage.replace("{user_id}", ctx.from.id.toString());
                var replyStr = notJoinedMessage.replace("{channel}", `@${channel}`);

                if(enable_inline){
                    Markup.inlineKeyboard([
                        Markup.button.url("Join Channel",`https://t.me/${channel}`)
                    ]);
                }
                ctx.reply(replyStr, { parse_mode });
                return;
            }
            else{
                continue;
            }
        }
        await next();
    }
    return middleware;
}